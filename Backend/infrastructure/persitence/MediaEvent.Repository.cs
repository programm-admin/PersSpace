using Domain.MediaEvents;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Entities;
using Infrastructure.Mappers;

public class MediaEventRepository(AppDBProvider db) : IMediaEventRepository
{

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
            MediaEventCreated = mediaEvent.MediaEventCreated
        };

        db.MediaEvents.Add(mediaEventEntity);
        await db.SaveChangesAsync();
    }

    public async Task DeleteMediaEvent(Guid userId, Guid eventId)
    {
        MediaEventEntity? entity = await db.MediaEvents.FirstOrDefaultAsync(ev => ev.Id == eventId && ev.UserAccountId == userId);

        if (entity is null) return;

        db.MediaEvents.Remove(entity);
        await db.SaveChangesAsync();
    }

    public async Task<IReadOnlyList<MediaEvent>> GetAllMediaEventsForUser(Guid userAccountId)
    {
        List<MediaEventEntity> entities = await db.MediaEvents.AsNoTracking().Where(ev => ev.UserAccountId == userAccountId).OrderBy(ev => ev.Title).ToListAsync();

        return [.. entities.Select(MediaEventMapper.ToDomain)];
    }

    public async Task<MediaEvent?> GetMediaEventById(Guid userAccountId, Guid eventId)
    {
        MediaEventEntity? entity = await db.MediaEvents.AsNoTracking().FirstOrDefaultAsync(e => e.UserAccountId == userAccountId && e.Id == eventId);

        if (entity is null) return null;

        return new MediaEvent(entity.Id, entity.UserAccountId, entity.Title, entity.Notes, entity.Start, entity.End, entity.IsDone, entity.MediaEventCreated);
    }

    public async Task UpdateMediaEvent(MediaEvent mediaEvent)
    {
        MediaEventEntity? entity = await db.MediaEvents.FirstOrDefaultAsync(ev => ev.Id == mediaEvent.ID & ev.UserAccountId == mediaEvent.UserAccountID);

        if (entity is null) throw new InvalidOperationException("[ERROR - MediaEventRepository: UpdateMediaEvent()] No media event found for given event id and user account id.");

        entity.Title = mediaEvent.Title;
        entity.Notes = mediaEvent.Notes;
        entity.Start = mediaEvent.Start;
        entity.End = mediaEvent.End;
        entity.IsDone = mediaEvent.IsDone;

        await db.SaveChangesAsync();
    }
}