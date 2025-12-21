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
            if (string.IsNullOrEmpty(request.UserID)) return BadRequest("[ERROR] id is empty");

            try
            {
                List<M_MediaEvent>? events = await _db.Events.AsNoTracking().Where(ev => ev.UserAccountID == request.UserID).ToListAsync();

                if (events == null) return BadRequest("[ERROR] no events found");

                List<M_EventDTO> mappedEvents = _mappingService.mapEventsToDTO(events);

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
    }
}
