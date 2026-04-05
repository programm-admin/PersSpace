using Application.Common;
using Infrastructure.Entities;

namespace Application.GeneralEvents.Delete;

public class DeleteGeneralEventHandler(IGeneralEventRepository repository) : IUseCaseHandler<DeleteGeneralEventCommand, GeneralEventResult>
{
    public async Task<GeneralEventResult> HandleAsync(DeleteGeneralEventCommand request)
    {
        GeneralEventEntity deletedEntity = await repository.DeleteGeneralEvent(request.UserAccountId, request.EventId);

        return new GeneralEventResult(
            deletedEntity.Id,
            deletedEntity.Title,
            deletedEntity.Notes,
            deletedEntity.MeetingPlace,
            deletedEntity.Start,
            deletedEntity.End,
            deletedEntity.IsDone,
            deletedEntity.GeneralEventCreated
        );
    }
}