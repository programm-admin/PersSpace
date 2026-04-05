using Application.Common;
using Domain.GeneralEvents;

namespace Application.GeneralEvents.Create;

public class CreateGeneralEventHandler(IGeneralEventRepository repository) : IUseCaseHandler<CreateGeneralEventCommand, GeneralEventResult>
{
    public async Task<GeneralEventResult> HandleAsync(CreateGeneralEventCommand request)
    {
        var generalEvent = new GeneralEvent(
           Guid.NewGuid(),
           request.UserAccountId,
           request.Title,
           request.Notes,
           request.MeetingPlace,
           request.Start,
           request.End,
           request.IsDone,
           DateTime.UtcNow
       );

        await repository.AddGeneralEvent(generalEvent);

        return new GeneralEventResult(
            generalEvent.ID,
            generalEvent.Title,
            generalEvent.Notes,
            generalEvent.MeetingPlace,
            generalEvent.Start,
            generalEvent.End,
            generalEvent.IsDone,
            generalEvent.GeneralEventCreated
        );
    }
}