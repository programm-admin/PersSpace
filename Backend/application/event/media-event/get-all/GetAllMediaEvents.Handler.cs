using Application.Common;
using Domain.MediaEvents;

namespace Application.MediaEvents.GetAll;

public class GetMediaEventHandler : IUseCaseHandler<GetAllMediaEventsCommand, IReadOnlyList<MediaEventResult>>
{
    private readonly IMediaEventRepository _repository;

    public GetMediaEventHandler(IMediaEventRepository repository) { _repository = repository; }

    public async Task<IReadOnlyList<MediaEventResult>> HandleAsync(GetAllMediaEventsCommand request)
    {
        IReadOnlyList<MediaEvent> events = await _repository.GetAllMediaEventsForUser(request.UserAccountId);
        return events.Select(e => new MediaEventResult(e.ID, e.Title, e.Start, e.End, e.IsDone)).ToList();
    }
}