using Application.Common;
using Application.Exceptions;
using Domain.GeneralEvents;

namespace Application.GeneralEvents.Update;

public class UpdateGeneralEventHandler(IGeneralEventRepository repository) : IUseCaseHandler<UpdateGeneralEventCommand, GeneralEventResult>
{
    public async Task<GeneralEventResult> HandleAsync(
        UpdateGeneralEventCommand command)
    {
        GeneralEvent? generalEvent =
            await repository.GetGeneralEventById(command.UserAccountId, command.EventId);

        if (generalEvent is null) throw new NotFoundException("[ERROR - UpdateMediaEventHandler: HandleAsync()] Error when trying to get media for update");

        generalEvent.UpdateMediaEvent(
            command.Title,
            command.Notes,
            command.Start,
            command.End,
            command.IsDone
        );

        await repository.UpdateGeneralEvent(generalEvent);

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