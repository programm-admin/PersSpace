using Backend.Data;
using Backend.DataTransferObjects;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace Backend.Controllers.Event
{
    [ApiController]
    [Route("user/[controller]")]
    public class MediaEventController : Controller
    {
        private readonly AppDBProvider _db;
        private readonly MappingService _mappingService;

        public MediaEventController(AppDBProvider db, MappingService mappingService)
        {
            _db = db;
            _mappingService = mappingService;
        }

        public class EventRequest { public required string UserID { get; set; } }



        [HttpPost("all")]
        public async Task<ActionResult<ICollection<M_EventDTO>>> getAllEvents([FromBody] EventRequest request)
        {
            var userID = HttpContext.GetUserID();

            try
            {
                List<M_MediaEvent>? mediaEvents = await _db.MediaEvents.AsNoTracking().Where(ev => ev.UserAccountID == userID).ToListAsync();

                if (mediaEvents == null) return BadRequest("[ERROR] no events found");

                List<M_EventDTO> mappedEvents = _mappingService.mapEventsToDTO(mediaEvents);

                return Ok(new
                {
                    mappedEvents,
                    status = "ok"
                });
            }
            catch (TimeoutException)
            {
                return StatusCode(504, new
                {
                    message = "Timeout beim Laden der Events",
                    status = "error"
                });
            }
            catch (NpgsqlException)
            {
                return StatusCode(503, new
                {
                    message = "Datenbank ist nicht erreichbar.",
                    status = "error"
                });
            }
            catch (Exception ex)
            {
                Console.Write("[MEDIA_EVENT ERROR] get all events -> ", ex.Message);
                return StatusCode(500, new
                {
                    message = "Es ist ein unerwarteter Fehler aufgetreten.",
                    status = "error"
                });
            }
        }

        [HttpPost("create")]
        public async Task<ActionResult<M_MediaEvent>> createNewMediaEvent([FromBody] M_MediaEvent body)
        {
            // get user ID from http context (user middleware)
            Guid userID = HttpContext.GetUserID();
            // check incoming event for required properties
            var errors = ValidationHelper.ValidateObject(body);

            if (errors.Any())
            {
                return BadRequest(new { status = "error", Errors = errors });
            }

            // writing new media event to DB
            var newMediaEvent = new M_MediaEvent
            {
                ID = Guid.NewGuid(),
                UserAccountID = userID,
                Title = body.Title,
                Notes = body.Notes,
                Start = body.Start,
                End = body.End,
                IsDone = body.IsDone,
                MediaEventCreated = DateTime.UtcNow
            };

            _db.MediaEvents.Add(newMediaEvent);
            await _db.SaveChangesAsync();

            return Ok(new { mediaEvent = newMediaEvent });
        }

        [HttpPatch("update")]
        public async Task<ActionResult<M_MediaEvent>> updateMediaEvent([FromBody] M_MediaEvent body)
        {
            // get user ID from http context (user middleware)
            Guid userID = HttpContext.GetUserID();
            var errors = ValidationHelper.ValidateObject(body);

            if (errors.Any())
            {
                return BadRequest(new { status = "error", Errors = errors });
            }

            // updating event
            var foundMediaEvent = await _db.MediaEvents.FirstOrDefaultAsync(ev => ev.UserAccountID == userID && ev.ID == body.ID);

            if (foundMediaEvent == null) return NotFound();

            // updating properties
            foundMediaEvent.Title = body.Title;
            foundMediaEvent.Notes = body.Notes;
            foundMediaEvent.Start = body.Start;
            foundMediaEvent.End = body.End;
            foundMediaEvent.IsDone = body.IsDone;

            await _db.SaveChangesAsync();
            return Ok(new { mediaEvent = foundMediaEvent, status = "success" });
        }
    }
}
