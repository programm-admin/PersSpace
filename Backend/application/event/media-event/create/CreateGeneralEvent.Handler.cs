using Application.Common;
using Domain.GeneralEvents;

namespace Application.GeneralEvents.Create;

public class CreateGeneralEventHandler(IGeneralEventRepository repository) : IUseCaseHandler<CreateGeneralEventCommand, GeneralEventResult>
{
    public async Task<GeneralEventResult> HandleAsync(CreateGeneralEventCommand request)
    {
        var mediaEvent = new GeneralEvent(
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

        await repository.AddGeneralEvent(mediaEvent);

        return new GeneralEventResult(
            mediaEvent.ID,
            mediaEvent.Title,
            mediaEvent.Notes,
            mediaEvent.MeetingPlace,
            mediaEvent.Start,
            mediaEvent.End,
            mediaEvent.IsDone
        );
    }
}