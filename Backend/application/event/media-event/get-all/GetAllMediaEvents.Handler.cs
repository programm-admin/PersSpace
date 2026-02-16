using Application.Common;
using Domain.MediaEvents;

namespace Application.MediaEvents.GetAll;

public class GetAllMediaEventHandler(IMediaEventRepository repository) : IUseCaseHandler<GetAllMediaEventsCommand, IReadOnlyList<MediaEventResult>>
{
    public async Task<IReadOnlyList<MediaEventResult>> HandleAsync(GetAllMediaEventsCommand request)
    {
        IReadOnlyList<MediaEvent> events = await repository.GetAllMediaEventsForUser(request.UserAccountId);
        return events.Select(e => new MediaEventResult(e.ID, e.Title, e.Notes, e.Start, e.End, e.IsDone)).ToList();
    }
}