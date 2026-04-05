using Domain.GeneralEvents;
using Infrastructure.Entities;

public interface IGeneralEventRepository
{
    Task AddGeneralEvent(GeneralEvent generalEvent);
    Task<GeneralEvent> GetGeneralEventById(Guid userAccountId, Guid eventId);
    Task<IReadOnlyList<GeneralEvent>> GetAllMediaEventsForUser(Guid userAccountId);
    Task<GeneralEvent> UpdateGeneralEvent(GeneralEvent generalEvent);
    Task<GeneralEventEntity> DeleteGeneralEvent(Guid userId, Guid eventId);
}