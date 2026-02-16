using Application.Common;
using Domain.MediaEvents;

namespace Application.MediaEvents.Update;

public class UpdateMediaEventHandler(IMediaEventRepository repository) : IUseCaseHandler<UpdateMediaEventCommand, MediaEventResult>
{
    public async Task<MediaEventResult?> HandleAsync(
        UpdateMediaEventCommand command)
    {
        MediaEvent? mediaEvent =
            await repository.GetMediaEventById(command.EventId, command.UserAccountId);

        if (mediaEvent is null) return null;

        mediaEvent.UpdateMediaEvent(
            command.Title,
            command.Notes,
            command.Start,
            command.End,
            command.IsDone
        );

        await repository.UpdateMediaEvent(mediaEvent);

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