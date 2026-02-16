using Api.Request.MediaEvents;
using Application.MediaEvents.Create;
using Application.MediaEvents.Delete;
using Application.MediaEvents.GetAll;
using Application.MediaEvents.GetSingle;
using Application.MediaEvents.Update;
using Backend.DataTransferObjects;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.MediaEvents;

[ApiController]
[Route("user/[controller]")]
public class MediaEventController : ControllerBase
{
    private readonly GetAllMediaEventHandler _getAllHandler;
    private readonly GetMediaEventHandler _getHandler;
    private readonly CreateMediaEventHandler _createHandler;
    private readonly UpdateMediaEventHandler _updateHandler;
    private readonly DeleteMediaEventHandler _deleteHandler;


    public class MediaEventRequest { public required string mediaID { get; set; } }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetMediaEventById(Guid mediaEventId)
    {
        Guid userId = HttpContext.GetUserID();
        IReadOnlyList<MediaEventResult> result = await _getAllHandler.HandleAsync(new GetAllMediaEventsCommand(userId));

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


    [HttpPatch("update")]
    public async Task<ActionResult<MediaEventResult>> UpdateMediaEvent([FromBody] M_MediaEventUpdateRequestDTO body)
    {
        var errors = ValidationHelper.ValidateObject(body);
        if (errors.Any()) return BadRequest(new { status = "error", Errors = errors });
        if (!Guid.TryParse(body.ID, out var mediaGUID)) return BadRequest("[ERROR] Invalid media Id.");

        Guid userId = HttpContext.GetUserID();

        var result = await _updateHandler.HandleAsync(new UpdateMediaEventCommand(
            mediaGUID,
            userId,
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

        Guid userId = HttpContext.GetUserID();

        MediaEventResult? mediaEvent = await _deleteHandler.HandleAsync(new DeleteMediaEventCommand(mediaGUID, userId));

        return mediaEvent is null ? NoContent() : Ok(new { status = "success", message = $"Event '{mediaEvent.Title}' erfolgreich gelöscht" });
    }

}