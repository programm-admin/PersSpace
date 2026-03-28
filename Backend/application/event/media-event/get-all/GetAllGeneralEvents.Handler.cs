using Application.Common;
using Domain.GeneralEvents;

namespace Application.GeneralEvents.GetAll;

public class GetAllMediaEventHandler(IGeneralEventRepository repository) : IUseCaseHandler<GetAllGeneralEventsCommand, IReadOnlyList<GeneralEventResult>>
{
    public async Task<IReadOnlyList<GeneralEventResult>> HandleAsync(GetAllGeneralEventsCommand request)
    {
        IReadOnlyList<GeneralEvent> events = await repository.GetAllMediaEventsForUser(request.UserAccountId);
        return [.. events.Select(e => new GeneralEventResult(e.ID, e.Title, e.Notes, e.MeetingPlace, e.Start, e.End, e.IsDone))];
    }
}