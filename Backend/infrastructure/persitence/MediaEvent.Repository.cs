using Domain.MediaEvents;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Entities;
using Infrastructure.Mappers;
using Application.Exceptions;

public class MediaEventRepository(AppDBProvider db) : IMediaEventRepository
{
    public async Task<IReadOnlyList<MediaEvent>> GetAllMediaEventsForUser(Guid userAccountId)
    {
        try
        {
            List<MediaEventEntity> entities = await db.MediaEvents.AsNoTracking().Where(ev => ev.UserAccountId == userAccountId).OrderBy(ev => ev.Title).ToListAsync();

            return [.. entities.Select(MediaEventMapper.ToDomain)];
        }
        catch (Exception ex)
        {
            throw new PersistanceExeption("[ERROR - MediaEventRepository: GetALlMediaEventsForUser()] Error when trying to get media events from DB:", ex);
        }
    }

    public async Task<MediaEvent?> GetMediaEventById(Guid userAccountId, Guid eventId)
    {
        try
        {
            MediaEventEntity? entity = await db.MediaEvents.AsNoTracking().FirstOrDefaultAsync(e => e.UserAccountId == userAccountId && e.Id == eventId);

            if (entity is null) return null;

            return new MediaEvent(entity.Id, entity.UserAccountId, entity.Title, entity.Notes, entity.Start, entity.End, entity.IsDone, entity.MediaEventCreated);
        }
        catch (Exception ex)
        {
            throw new PersistanceExeption("[ERROR - MediaEventRepository: GetMediaEventById()] Failed to get media event for given event id and user account id from DB:", ex);
        }
    }
    public async Task AddMediaEvent(MediaEvent mediaEvent)
    {
        try
        {
            MediaEventEntity mediaEventEntity = MediaEventMapper.ToEntity(mediaEvent);

            db.MediaEvents.Add(mediaEventEntity);
            await db.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            throw new PersistanceExeption("[ERROR - MediaEventRepository: AddMediaEvent()] Error when trying to insert new media event into DB:", ex);
        }
    }

    public async Task UpdateMediaEvent(MediaEvent mediaEvent)
    {
        try
        {
            int rowsAffectedByUpdate = await db.MediaEvents.Where(ev => ev.Id == mediaEvent.ID && ev.UserAccountId == mediaEvent.UserAccountID).ExecuteUpdateAsync(
                setters => setters
                    .SetProperty(ev => ev.Title, mediaEvent.Title)
                    .SetProperty(ev => ev.Notes, mediaEvent.Notes)
                    .SetProperty(ev => ev.Start, mediaEvent.Start)
                    .SetProperty(ev => ev.End, mediaEvent.End)
                    .SetProperty(ev => ev.IsDone, mediaEvent.IsDone)
            );

            if (rowsAffectedByUpdate != 1) throw new InvalidOperationException("[ERROR - MediaEventRepository: UpdateMediaEvent()] No media event found for given event id and user account id.");

            await db.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            throw new PersistanceExeption("[ERROR - MediaEventRepository: UpdateMediaEvent()] Error when trying to update media event:", ex);
        }
    }

    public async Task DeleteMediaEvent(Guid userId, Guid eventId)
    {
        try
        {
            MediaEventEntity? entity = await db.MediaEvents.FirstOrDefaultAsync(ev => ev.Id == eventId && ev.UserAccountId == userId);

            if (entity is null) return;

            db.MediaEvents.Remove(entity);
            await db.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            throw new PersistanceExeption("[ERROR - MediaEventRepository: UpdateMediaEvent()] Error when trying to delete media event:", ex);
        }
    }
}