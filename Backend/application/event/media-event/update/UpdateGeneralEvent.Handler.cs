using Application.Common;
using Application.Exceptions;
using Domain.GeneralEvents;

namespace Application.GeneralEvents.Update;

public class UpdateGeneralEventHandler(IGeneralEventRepository repository) : IUseCaseHandler<UpdateGeneralEventCommand, GeneralEventResult>
{
    public async Task<GeneralEventResult> HandleAsync(
        UpdateGeneralEventCommand command)
    {
        GeneralEvent updatedEvent = await repository.UpdateGeneralEvent(new GeneralEvent(
            command.EventId,
            command.UserAccountId,
            command.Title,
            command.Notes,
            command.MeetingPlace,
            command.Start,
            command.End,
            command.IsDone,
            DateTime.Now
        ));

        return new GeneralEventResult(
            updatedEvent.ID,
            updatedEvent.Title,
            updatedEvent.Notes,
            updatedEvent.MeetingPlace,
            updatedEvent.Start,
            updatedEvent.End,
            updatedEvent.IsDone,
            updatedEvent.GeneralEventCreated
        );
    }
}