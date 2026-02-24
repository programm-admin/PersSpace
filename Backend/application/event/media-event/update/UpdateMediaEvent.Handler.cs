using Application.Common;
using Application.Exceptions;
using Domain.MediaEvents;

namespace Application.MediaEvents.Update;

public class UpdateMediaEventHandler(IMediaEventRepository repository) : IUseCaseHandler<UpdateMediaEventCommand, MediaEventResult>
{
    public async Task<MediaEventResult> HandleAsync(
        UpdateMediaEventCommand command)
    {
        MediaEvent? mediaEvent =
            await repository.GetMediaEventById(command.UserAccountId, command.EventId);

        if (mediaEvent is null) throw new NotFoundException("[ERROR - UpdateMediaEventHandler: HandleAsync()] Error when trying to get media for update");

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