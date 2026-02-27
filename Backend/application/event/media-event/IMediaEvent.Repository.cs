using Domain.MediaEvents;

public interface IMediaEventRepository
{
    Task AddMediaEvent(MediaEvent mediaEvent);
    Task<MediaEvent> GetMediaEventById(Guid userAccountId, Guid eventId);
    Task<IReadOnlyList<MediaEvent>> GetAllMediaEventsForUser(Guid userAccountId);
    Task UpdateMediaEvent(MediaEvent mediaEvent);
    Task DeleteMediaEvent(Guid userId, Guid eventId);
}