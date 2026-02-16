using Application.Common;
using Domain.MediaEvents;

namespace Application.MediaEvents.Delete;

public class DeleteMediaEventHandler : IUseCaseHandler<DeleteMediaEventCommand, MediaEventResult?>
{
    private readonly IMediaEventRepository _repository;

    public DeleteMediaEventHandler(IMediaEventRepository repository) { _repository = repository; }

    public async Task<MediaEventResult?> HandleAsync(DeleteMediaEventCommand request)
    {
        MediaEvent? mediaEvent = await _repository.GetMediaEventById(request.UserAccountId, request.EventId);

        if (mediaEvent is null) return null;

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