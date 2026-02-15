using Application.Common;
using Domain.MediaEvents;

public class CreateMediaEventHandler : IUseCaseHandler<CreateMediaEventCommand, MediaEventResult>
{
    private readonly IMediaEventRepository _repository;

    public CreateMediaEventHandler(IMediaEventRepository repository) { _repository = repository; }


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

        await _repository.AddMediaEvent(mediaEvent);

        return new MediaEventResult(mediaEvent.ID, mediaEvent.Title, mediaEvent.Start, mediaEvent.End, mediaEvent.IsDone);
    }
}