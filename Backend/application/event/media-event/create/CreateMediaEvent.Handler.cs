using Application.Common;
using Domain.MediaEvents;

namespace Application.MediaEvents.Create;

public class CreateMediaEventHandler(IMediaEventRepository repository) : IUseCaseHandler<CreateMediaEventCommand, MediaEventResult>
{
    public async Task<MediaEventResult> HandleAsync(CreateMediaEventCommand request)
    {
        var mediaEvent = new MediaEvent(
           Guid.NewGuid(),
           request.UserAccountId,
           request.Title,
           request.Notes,
           request.Start,
           request.End,
           request.IsDone,
           DateTime.UtcNow
       );

        await repository.AddMediaEvent(mediaEvent);

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