using Api.Validation;
using Application.GeneralEvents.Create;
using Application.GeneralEvents.Delete;
using Application.GeneralEvents.GetAll;
using Application.GeneralEvents.GetSingle;
using Application.GeneralEvents.Update;
using Application.Users;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.MediaEvents;

[ApiController]
[Authorize]
[Route("user/[controller]")]
public class GeneralEventController(
    GetAllGeneralEventHandler getAllHandler,
    GetGeneralEventHandler getHandler,
    CreateGeneralEventHandler createHandler,
    UpdateGeneralEventHandler updateHandler,
    DeleteGeneralEventHandler deleteHandler,
    ICurrentUserService currentUserService
) : ControllerBase
{
    public class GeneralEventRequest { public required string eventID { get; set; } }
    public class GeneralEventUpdateRequest
    {
        public required string Id { get; set; }
        public required string Title { get; set; }
        public string? Notes { get; set; }
        public string? MeetingPlace {get; set;}
        public required DateTime Start { get; set; }
        public required DateTime End { get; set; }
        public required bool IsDone { get; set; }
        public required DateTime GeneralEventCreated { get; set; }
    }
    public class CreateGeneralEventRequest
    {
        public string Title { get; set; } = null!;
        public string Notes { get; set; } = null!;
        public string MeetingPlace {get; set;} = null!;
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsDone { get; set; } = false;
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAllGeneralEventsForUser()
    {
        User currentUser = currentUserService.GetCurrentUserAsync().Result;
        IReadOnlyList<GeneralEventResult> generalEvents = await getAllHandler.HandleAsync(new GetAllGeneralEventsCommand(currentUser.ID));

        if (generalEvents is null) return NotFound("[ERROR] Keine Events gefunden.");

        return StatusCode(200, new { status = "success", generalEvents });
    }


    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetGeneralEventById(string id)
    {
        if (!Guid.TryParse(id, out var eventGUID)) return BadRequest("[ERROR] Invalid event id.");

        User currentUser = currentUserService.GetCurrentUserAsync().Result;
        GeneralEventResult? result = await getHandler.HandleAsync(new GetGeneralEventCommand(currentUser.ID, eventGUID));

        if (result is null) return NotFound("[ERROR] Kein Event gefunden.");
        return StatusCode(200, new { status = "success", generalEvent = result });
    }



    [HttpPost("create")]
    public async Task<IActionResult> CreateNewGeneralEvent([FromBody] CreateGeneralEventRequest request)
    {
        var errors = ValidationHelper.ValidateObject(request);

        if (errors.Any()) return BadRequest(new { status = "error", Errors = errors });

        User currentUser = currentUserService.GetCurrentUserAsync().Result;
        GeneralEventResult? result = await createHandler.HandleAsync(new CreateGeneralEventCommand(
            currentUser.ID,
            request.Title,
            request.Notes,
            request.MeetingPlace,
            request.Start,
            request.End,
            request.IsDone
        ));

        if (result is null) return StatusCode(500, new { status = "error", message = "[ERROR] Fehler beim Anlegen des Medienevents." });

        return StatusCode(201, new { mediaEvent = result });

    }


    [HttpPatch("update")]
    public async Task<ActionResult<GeneralEventResult>> UpdateMediaEvent([FromBody] GeneralEventUpdateRequest body)
    {
        var errors = ValidationHelper.ValidateObject(body);
        if (errors.Any()) return BadRequest(new { status = "error", Errors = errors });
        if (!Guid.TryParse(body.Id, out var mediaGUID)) return BadRequest("[ERROR] Invalid media Id.");

        User currentUser = currentUserService.GetCurrentUserAsync().Result;

        var result = await updateHandler.HandleAsync(new UpdateGeneralEventCommand(
                    mediaGUID,
                    currentUser.ID,
                    body.Title,
                    body.Notes,
                    body.MeetingPlace,
                    body.Start,
                    body.End,
                    body.IsDone
                ));

        return result is null ? NotFound() : Ok(new { status = "success", message = $"Event '{result.Title}' erfolgreich editiert." });
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteMediaEvent([FromBody] GeneralEventRequest body)
    {
        var errors = ValidationHelper.ValidateObject(body);
        if (errors.Any()) return BadRequest(new { status = "error", Errors = errors });
        if (!Guid.TryParse(body.eventID, out var mediaGUID)) return BadRequest("[ERROR] Invalid media Id.");

        User currentUser = currentUserService.GetCurrentUserAsync().Result;

        GeneralEventResult? mediaEvent = await deleteHandler.HandleAsync(new DeleteGeneralEventCommand(mediaGUID, currentUser.ID));

        return mediaEvent is null ? NoContent() : Ok(new { status = "success", message = $"Event '{mediaEvent.Title}' erfolgreich gelöscht" });
    }
}