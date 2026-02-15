using Application.Common;
using Domain.MediaEvents;

public class GetMediaEventHandler : IUseCaseHandler<GetMediaEventCommand, MediaEventResult>
{
    private readonly IMediaEventRepository _repository;

    public GetMediaEventHandler(IMediaEventRepository repository) { _repository = repository; }

    public async Task<MediaEventResult> HandleAsync(GetMediaEventCommand request)
    {
        MediaEvent? mediaEvent = await _repository.GetMediaEventById(request.UserAccountID, request.MediaEventID);

        if (mediaEvent is null) return null;

        return new MediaEventResult(mediaEvent.ID, mediaEvent.Title, mediaEvent.Start, mediaEvent.End, mediaEvent.IsDone);
    }
}