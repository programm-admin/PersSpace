using Application.Common;
using Domain.MediaEvents;

namespace Application.MediaEvents.Update;

public class UpdateMediaEventHandler : IUseCaseHandler<UpdateMediaEventCommand, MediaEventResult>
{
    private readonly IMediaEventRepository _repository;

    public UpdateMediaEventHandler(IMediaEventRepository repository) { _repository = repository; }


    public async Task<MediaEventResult?> HandleAsync(
        UpdateMediaEventCommand command)
    {
        MediaEvent? mediaEvent =
            await _repository.GetMediaEventById(command.EventId, command.UserAccountId);

        if (mediaEvent is null) return null;

        mediaEvent.UpdateMediaEvent(
            command.Title,
            command.Notes,
            command.Start,
            command.End,
            command.IsDone
        );

        await _repository.UpdateMediaEvent(mediaEvent);

        return new MediaEventResult(
            mediaEvent.ID,
            mediaEvent.Title,
            mediaEvent.Notes,
            mediaEvent.Start,
            mediaEvent.End,
            mediaEvent.IsDone
        );
    }
}