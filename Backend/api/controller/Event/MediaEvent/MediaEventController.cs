// using Backend.Data;
// using Backend.DataTransferObjects;
// using Backend.Models;
// using Backend.Services;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using Npgsql;

// namespace Backend.Controllers.Event
// {
//     [ApiController]
//     [Route("user/[controller]")]
//     public class MediaEventController : Controller
//     {
//         private readonly AppDBProvider _db;
//         private readonly MappingService _mappingService;

//         public MediaEventController(AppDBProvider db, MappingService mappingService)
//         {
//             _db = db;
//             _mappingService = mappingService;
//         }

//         public class EventRequest { public required string UserID { get; set; } }
//         public class MediaEventRequest { public required string mediaID { get; set; } }
//         public class MediaEventUpdateRequest { public required M_MediaEventUpdateRequestDTO mediaEvent { get; set; } }


//         [HttpGet("all")]
//         public async Task<ActionResult<ICollection<M_MediaEventRequestDTO>>> getAllEvents()
//         {
//             var userID = HttpContext.GetUserID();

//             try
//             {
//                 List<M_MediaEvent>? mediaEvents = await _db.MediaEvents.AsNoTracking().Where(ev => ev.UserAccountID == userID).ToListAsync();

//                 if (mediaEvents == null) return BadRequest("[ERROR] no events found");

//                 List<M_MediaEventResponseDTO> mappedEvents = _mappingService.mapEventsToResponseDTO(mediaEvents);

//                 return Ok(new
//                 {
//                     mediaEvents = mappedEvents,
//                     status = "ok"
//                 });
//             }
//             catch (TimeoutException)
//             {
//                 return StatusCode(504, new
//                 {
//                     message = "Timeout beim Laden der Events",
//                     status = "error"
//                 });
//             }
//             catch (NpgsqlException)
//             {
//                 return StatusCode(503, new
//                 {
//                     message = "Datenbank ist nicht erreichbar.",
//                     status = "error"
//                 });
//             }
//             catch (Exception ex)
//             {
//                 Console.Write("[MEDIA_EVENT ERROR] get all events -> ", ex.Message);
//                 return StatusCode(500, new
//                 {
//                     message = "Es ist ein unerwarteter Fehler aufgetreten.",
//                     status = "error"
//                 });
//             }
//         }

//         [HttpPost("create")]
//         public async Task<ActionResult<M_MediaEvent>> CreateNewMediaEvent([FromBody] M_MediaEventRequestDTO body)
//         {
//             // get user ID from http context (user middleware)
//             Guid userID = HttpContext.GetUserID();
//             // check incoming event for required properties
//             var errors = ValidationHelper.ValidateObject(body);

//             if (errors.Any())
//             {
//                 return BadRequest(new { status = "error", Errors = errors });
//             }

//             // writing new media event to DB
//             var newMediaEvent = new M_MediaEvent
//             {
//                 ID = Guid.NewGuid(),
//                 UserAccountID = userID,
//                 Title = body.Title,
//                 Notes = body.Notes,
//                 Start = body.Start,
//                 End = body.End,
//                 IsDone = body.IsDone,
//                 MediaEventCreated = DateTime.UtcNow
//             };

//             _db.MediaEvents.Add(newMediaEvent);
//             await _db.SaveChangesAsync();

//             return Ok(new { mediaEvent = _mappingService.mapSingleEventToResponseDTO(newMediaEvent) });
//         }

//         [HttpPatch("update")]
//         public async Task<ActionResult<M_MediaEvent>> UpdateMediaEvent([FromBody] MediaEventUpdateRequest body)
//         {
//             // get user ID from http context (user middleware)

//             var errors = ValidationHelper.ValidateObject(body);

//             if (errors.Any()) return BadRequest(new { status = "error", Errors = errors });
//             if (!Guid.TryParse(body.mediaEvent.ID, out var mediaGUID)) return BadRequest("[ERROR] Invalid media id.");

//             Guid userID = HttpContext.GetUserID();

//             // updating event
//             var foundMediaEvent = await _db.MediaEvents.FirstOrDefaultAsync(ev => ev.UserAccountID == userID && ev.ID == mediaGUID);

//             if (foundMediaEvent == null) return NotFound();

//             // updating properties
//             foundMediaEvent.Title = body.mediaEvent.Title;
//             foundMediaEvent.Notes = body.mediaEvent.Notes;
//             foundMediaEvent.Start = body.mediaEvent.Start;
//             foundMediaEvent.End = body.mediaEvent.End;
//             foundMediaEvent.IsDone = body.mediaEvent.IsDone;

//             await _db.SaveChangesAsync();
//             return Ok(new { mediaEvent = _mappingService.mapSingleEventToResponseDTO(foundMediaEvent), status = "success" });
//         }

//         [HttpDelete("delete")]
//         public async Task<IActionResult> DeleteMediaEvent([FromBody] MediaEventRequest body)
//         {
//             var errors = ValidationHelper.ValidateObject(body);

//             if (errors.Any()) return BadRequest(new { status = "error", Errors = errors });

//             if (!Guid.TryParse(body.mediaID, out var mediaGUID)) return BadRequest("[ERROR] Invalid media id.");

//             Guid userId = HttpContext.GetUserID();
//             var foundMediaEvent = await _db.MediaEvents.FirstOrDefaultAsync(ev => ev.UserAccountID == userId && ev.ID == mediaGUID);

//             if (foundMediaEvent == null) return NotFound();

//             // delete media event
//             _db.MediaEvents.Remove(foundMediaEvent);
//             await _db.SaveChangesAsync();

//             return StatusCode(204, new { status = "success", mediaEventName = foundMediaEvent.Title });
//         }

//         [HttpPost("get-media-event")]
//         public async Task<IActionResult> GetMediaEvent([FromBody] MediaEventRequest body)
//         {
//             var errors = ValidationHelper.ValidateObject(body);

//             if (errors.Any()) return BadRequest(new { status = "error", Errors = errors });
//             if (!Guid.TryParse(body.mediaID, out var mediaGUID)) return BadRequest("[ERROR] Invalid media id.");

//             Guid userID = HttpContext.GetUserID();
//             M_MediaEvent? foundMediaEvent = await _db.MediaEvents.FirstOrDefaultAsync(ev => ev.UserAccountID == userID && ev.ID == mediaGUID);

//             if (foundMediaEvent == null) return NotFound("[ERROR] No media event found.");

//             return StatusCode(201, new { status = "success", mediaEvent = _mappingService.mapSingleEventToResponseDTO(foundMediaEvent) });
//         }
//     }
// }


using Api.Request.MediaEvents;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.MediaEvents;

[ApiController]
[Route("user/[controller]")]
public class MediaEventController : ControllerBase
{
    private readonly CreateMediaEventHandler _createHandler;
    private readonly GetMediaEventHandler _getHandler;

    public MediaEventController(CreateMediaEventHandler handler) { _createHandler = handler; }


    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetMediaEventById(Guid mediaEventId)
    {
        Guid userId = HttpContext.GetUserID();
        MediaEventResult? result = await _getHandler.HandleAsync(new GetMediaEventCommand(userId, mediaEventId));

        if (result is null) return NotFound("[ERROR] Kein Medienevent gefunden.");

        return StatusCode(200, new { status = "success", mediaEvent = result });
    }



    [HttpPost("create")]
    public async Task<IActionResult> CreateNewMediaEvent([FromBody] CreateMediaEventRequest request)
    {
        Guid userId = HttpContext.GetUserID();
        var errors = ValidationHelper.ValidateObject(request);

        if (errors.Any()) return BadRequest(new { status = "error", Errors = errors });


        MediaEventResult? result = await _createHandler.HandleAsync(new CreateMediaEventCommand(
            userId,
            request.Title,
            request.Notes,
            request.Start,
            request.End,
            request.IsDone
        ));

        if (result is null) return StatusCode(500, new { status = "error", message = "[ERROR] Fehler beim Anlegen des Medienevents." });

        return StatusCode(201, new { mediaEvent = result });

    }

}