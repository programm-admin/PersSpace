using Domain.MediaEvents;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Entities;

public class MediaEventRepository : IMediaEventRepository
{
    private readonly AppDBProvider _db;

    public MediaEventRepository(AppDBProvider db) { _db = db; }

    public async Task AddMediaEvent(MediaEvent mediaEvent)
    {
        MediaEventEntity mediaEventEntity = new MediaEventEntity
        {
            Id = mediaEvent.ID,
            UserAccountId = mediaEvent.UserAccountID,
            Title = mediaEvent.Title,
            Notes = mediaEvent.Notes,
            Start = mediaEvent.Start,
            End = mediaEvent.End,
            IsDone = mediaEvent.IsDone,
            CreatedAt = mediaEvent.MediaEventCreated
        };

        _db.MediaEvents.Add(mediaEventEntity);
        await _db.SaveChangesAsync();
    }

    public Task DeleteMediaEvent(Guid userId, Guid eventId)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<MediaEvent>> GetAllMediaEventsForUser(Guid userAccountId)
    {
        throw new NotImplementedException();
    }

    public async Task<MediaEvent?> GetMediaEventById(Guid userAccountId, Guid eventId)
    {
        MediaEventEntity? entity = await _db.MediaEvents.AsNoTracking().FirstOrDefaultAsync(e => e.UserAccountId == userAccountId && e.Id == eventId);

        if (entity is null) return null;

        return new MediaEvent(entity.Id, entity.UserAccountId, entity.Title, entity.Notes, entity.Start, entity.End, entity.IsDone, entity.CreatedAt);
    }

    public Task UpdateMediaEvent(MediaEvent mediaEvent)
    {
        throw new NotImplementedException();
    }
}