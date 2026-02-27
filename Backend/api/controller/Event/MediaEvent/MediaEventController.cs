using Api.Validation;
using Application.MediaEvents.Create;
using Application.MediaEvents.Delete;
using Application.MediaEvents.GetAll;
using Application.MediaEvents.GetSingle;
using Application.MediaEvents.Update;
using Application.Users;
using Domain;
using Domain.MediaEvents;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.MediaEvents;

[ApiController]
[Authorize]
[Route("user/[controller]")]
public class MediaEventController(
    GetAllMediaEventHandler getAllHandler,
    GetMediaEventHandler getHandler,
    CreateMediaEventHandler createHandler,
    UpdateMediaEventHandler updateHandler,
    DeleteMediaEventHandler deleteHandler,
    ICurrentUserService currentUserService
) : ControllerBase
{
    public class MediaEventRequest { public required string mediaID { get; set; } }
    public class MediaEventUpdateRequest
    {
        public required string Id { get; set; }
        public required string Title { get; set; }
        public string? Notes { get; set; }
        public required DateTime Start { get; set; }
        public required DateTime End { get; set; }
        public required bool IsDone { get; set; }
        public required DateTime MediaEventCreated { get; set; }
    }
    public class CreateMediaEventRequest
    {
        public string Title { get; set; } = null!;
        public string Notes { get; set; } = null!;
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsDone { get; set; } = false;
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAllMediaEventsForUser()
    {
        User currentUser = currentUserService.GetCurrentUserAsync().Result;
        IReadOnlyList<MediaEventResult> mediaEvents = await getAllHandler.HandleAsync(new GetAllMediaEventsCommand(currentUser.ID));

        if (mediaEvents is null) return NotFound("[ERROR] Keine Medienevents gefunden.");

        return StatusCode(200, new { status = "success", mediaEvents = mediaEvents });
    }


    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetMediaEventById(string id)
    {
        if (!Guid.TryParse(id, out var mediaGUID)) return BadRequest("[ERROR] Invalid media id.");

        User currentUser = currentUserService.GetCurrentUserAsync().Result;
        MediaEventResult? result = await getHandler.HandleAsync(new GetMediaEventCommand(currentUser.ID, mediaGUID));

        if (result is null) return NotFound("[ERROR] Kein Medienevent gefunden.");
        return StatusCode(200, new { status = "success", mediaEvent = result });
    }



    [HttpPost("create")]
    public async Task<IActionResult> CreateNewMediaEvent([FromBody] CreateMediaEventRequest request)
    {
        var errors = ValidationHelper.ValidateObject(request);

        if (errors.Any()) return BadRequest(new { status = "error", Errors = errors });

        User currentUser = currentUserService.GetCurrentUserAsync().Result;
        MediaEventResult? result = await createHandler.HandleAsync(new CreateMediaEventCommand(
            currentUser.ID,
            request.Title,
            request.Notes,
            request.Start,
            request.End,
            request.IsDone
        ));

        if (result is null) return StatusCode(500, new { status = "error", message = "[ERROR] Fehler beim Anlegen des Medienevents." });

        return StatusCode(201, new { mediaEvent = result });

    }


    [HttpPatch("update")]
    public async Task<ActionResult<MediaEventResult>> UpdateMediaEvent([FromBody] MediaEventUpdateRequest body)
    {
        var errors = ValidationHelper.ValidateObject(body);
        if (errors.Any()) return BadRequest(new { status = "error", Errors = errors });
        if (!Guid.TryParse(body.Id, out var mediaGUID)) return BadRequest("[ERROR] Invalid media Id.");

        User currentUser = currentUserService.GetCurrentUserAsync().Result;

        var result = await updateHandler.HandleAsync(new UpdateMediaEventCommand(
                    mediaGUID,
                    currentUser.ID,
                    body.Title,
                    body.Notes,
                    body.Start,
                    body.End,
                    body.IsDone
                ));

        return result is null ? NotFound() : Ok(new { status = "success", message = $"Event '{result.Title}' erfolgreich editiert." });
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteMediaEvent([FromBody] MediaEventRequest body)
    {
        var errors = ValidationHelper.ValidateObject(body);
        if (errors.Any()) return BadRequest(new { status = "error", Errors = errors });
        if (!Guid.TryParse(body.mediaID, out var mediaGUID)) return BadRequest("[ERROR] Invalid media Id.");

        User currentUser = currentUserService.GetCurrentUserAsync().Result;

        MediaEventResult? mediaEvent = await deleteHandler.HandleAsync(new DeleteMediaEventCommand(mediaGUID, currentUser.ID));

        return mediaEvent is null ? NoContent() : Ok(new { status = "success", message = $"Event '{mediaEvent.Title}' erfolgreich gelöscht" });
    }

}