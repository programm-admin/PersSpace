using Application.Common;
using Domain.MediaEvents;

namespace Application.MediaEvents.GetAll;

public class GetAllMediaEventHandler : IUseCaseHandler<GetAllMediaEventsCommand, IReadOnlyList<MediaEventResult>>
{
    private readonly IMediaEventRepository _repository;

    public GetAllMediaEventHandler(IMediaEventRepository repository) { _repository = repository; }

    public async Task<IReadOnlyList<MediaEventResult>> HandleAsync(GetAllMediaEventsCommand request)
    {
        IReadOnlyList<MediaEvent> events = await _repository.GetAllMediaEventsForUser(request.UserAccountId);
        return events.Select(e => new MediaEventResult(e.ID, e.Title, e.Notes, e.Start, e.End, e.IsDone)).ToList();
    }
}