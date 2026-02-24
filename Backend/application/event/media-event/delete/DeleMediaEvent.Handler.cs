using Application.Common;
using Application.Exceptions;
using Domain.MediaEvents;

namespace Application.MediaEvents.Delete;

public class DeleteMediaEventHandler(IMediaEventRepository repository) : IUseCaseHandler<DeleteMediaEventCommand, MediaEventResult>
{
    public async Task<MediaEventResult> HandleAsync(DeleteMediaEventCommand request)
    {
        MediaEvent? mediaEvent = await repository.GetMediaEventById(request.UserAccountId, request.EventId);

        if (mediaEvent is null) throw new NotFoundException("[ERROR - DeleteMediaEventHandler: HandleAsync()] Error when trying to get media for deleting");

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