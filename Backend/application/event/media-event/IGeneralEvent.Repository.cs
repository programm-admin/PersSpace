using Domain.GeneralEvents;

public interface IGeneralEventRepository
{
    Task AddGeneralEvent(GeneralEvent mediaEvent);
    Task<GeneralEvent> GetGeneralEventById(Guid userAccountId, Guid eventId);
    Task<IReadOnlyList<GeneralEvent>> GetAllMediaEventsForUser(Guid userAccountId);
    Task UpdateGeneralEvent(GeneralEvent mediaEvent);
    Task DeleteGeneralEvent(Guid userId, Guid eventId);
}