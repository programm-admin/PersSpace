using Application.Common;
using Application.Exceptions;
using Domain.MediaEvents;

namespace Application.MediaEvents.GetSingle;

public class GetMediaEventHandler(IMediaEventRepository repository) : IUseCaseHandler<GetMediaEventCommand, MediaEventResult>
{
    public async Task<MediaEventResult> HandleAsync(GetMediaEventCommand request)
    {
        MediaEvent? mediaEvent = await repository.GetMediaEventById(request.UserAccountID, request.MediaEventID);

        if (mediaEvent is null) throw new NotFoundException("[ERROR - GetMediaEventHandler: HandleAsync()] Error when trying to get media");

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