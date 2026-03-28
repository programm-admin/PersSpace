using Application.Common;
using Application.Exceptions;
using Domain.GeneralEvents;

namespace Application.GeneralEvents.GetSingle;

public class GetGeneralEventHandler(IGeneralEventRepository repository) : IUseCaseHandler<GetGeneralEventCommand, GeneralEventResult>
{
    public async Task<GeneralEventResult> HandleAsync(GetGeneralEventCommand request)
    {
        GeneralEvent? generalEvent = await repository.GetGeneralEventById(request.UserAccountID, request.MediaEventID);

        if (generalEvent is null) throw new NotFoundException("[ERROR - GetMediaEventHandler: HandleAsync()] Error when trying to get media");

        return new GeneralEventResult(
            generalEvent.ID,
            generalEvent.Title,
            generalEvent.Notes,
            generalEvent.MeetingPlace,
            generalEvent.Start,
            generalEvent.End,
            generalEvent.IsDone
        );
    }
}