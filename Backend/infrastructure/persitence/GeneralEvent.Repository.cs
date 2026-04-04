using Domain.GeneralEvents;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Entities;
using Infrastructure.Mappers;
using Application.Exceptions;

public class GeneralEventRepository(AppDBProvider db) : IGeneralEventRepository
{
    /// <summary>
    /// Function for returning a single general event from the DB as a raw DB entity without tracking (not suited for update requests or other functions which require a tracking of changes in DB!).
    /// </summary>
    /// <param name="userAccountId"></param>
    /// <param name="eventId"></param>
    /// <returns>GeneralEventEntity</returns>
    /// <exception cref="NotFoundException"></exception>
    /// <exception cref="PersistanceExeption"></exception>
    private async Task<GeneralEventEntity> GetGeneralEventByIdAsEntity(Guid userAccountId, Guid eventId)
    {
        try
        {
            GeneralEventEntity? entity = await db.GeneralEvents.AsNoTracking().FirstOrDefaultAsync(e => e.UserAccountId == userAccountId && e.Id == eventId);
            if (entity is null) throw new NotFoundException("[ERROR - GeneralEventRepository: GetGeneralEventByIdAsEntity()] No event in DB found.");

            return entity;
        } 
        catch(Exception ex)
        {
            throw new PersistanceExeption("[ERROR - GeneralEventRepository: GetGeneralEventByIdAsEntity()] Error when trying to find general event in DB:", ex);
        }
    }

    /// <summary>
    /// Function for getting a single GeneralEvent from the DB with tracking for checking for changes (for update endpoint).
    /// </summary>
    /// <param name="userAccountId"></param>
    /// <param name="eventId"></param>
    /// <returns>GeneralEventEntity</returns>
    /// <exception cref="NotFoundException"></exception>
    /// <exception cref="PersistanceExeption"></exception>
    private async Task<GeneralEventEntity> GetGeneralEventByIdAsEntityForUpdate(Guid userAccountId, Guid eventId)
    {
        try
        {
            GeneralEventEntity? entity = await db.GeneralEvents.FirstOrDefaultAsync(e => e.UserAccountId == userAccountId && e.Id == eventId);
            if (entity is null) throw new NotFoundException("[ERROR - GeneralEventRepository: GetGeneralEventByIdAsEntity()] No event in DB found.");

            return entity;
        } 
        catch(Exception ex)
        {
            throw new PersistanceExeption("[ERROR - GeneralEventRepository: GetGeneralEventByIdAsEntity()] Error when trying to find general event in DB:", ex);
        }
    }

    public async Task<IReadOnlyList<GeneralEvent>> GetAllMediaEventsForUser(Guid userAccountId)
    {
        try
        {
            List<GeneralEventEntity> entities = await db.GeneralEvents.AsNoTracking().Where(ev => ev.UserAccountId == userAccountId).OrderBy(ev => ev.Title).ToListAsync();

            return [.. entities.Select(GeneralEventMapper.ToDomain)];
        }
        catch (Exception ex)
        {
            throw new PersistanceExeption("[ERROR - GeneralEventRepository: GetALlMediaEventsForUser()] Error when trying to get media events from DB:", ex);
        }
    }

    public async Task<GeneralEvent> GetGeneralEventById(Guid userAccountId, Guid eventId)
    {
        try
        {
            GeneralEventEntity entity = await GetGeneralEventByIdAsEntity(userAccountId, eventId);

            return new GeneralEvent(
                entity.Id,
                entity.UserAccountId,
                entity.Title,
                entity.Notes,
                entity.MeetingPlace,
                entity.Start,
                entity.End,
                entity.IsDone,
                entity.GeneralEventCreated
            );
        }
        catch (Exception ex)
        {
            throw new PersistanceExeption("[ERROR - GeneralEventRepository: GetGeneralEventByIdAsEntity()] Failed to get media event for given event id and user account id from DB:", ex);
        }
    }
    public async Task AddGeneralEvent(GeneralEvent mediaEvent)
    {
        try
        {
            GeneralEventEntity generalEventEntity = GeneralEventMapper.ToEntity(mediaEvent);

            db.GeneralEvents.Add(generalEventEntity);
            await db.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            throw new PersistanceExeption("[ERROR - GeneralEventRepository: AddGeneralEvent()] Error when trying to insert new general event into DB:", ex);
        }
    }

    public async Task<GeneralEvent> UpdateGeneralEvent(GeneralEvent generalEvent)
    {
        try
        {
            GeneralEventEntity foundEvent = await GetGeneralEventByIdAsEntityForUpdate(generalEvent.UserAccountID, generalEvent.ID);

            foundEvent.Title = generalEvent.Title;
            foundEvent.Notes = generalEvent.Notes;
            foundEvent.MeetingPlace = generalEvent.MeetingPlace;
            foundEvent.Start = generalEvent.Start;
            foundEvent.End = generalEvent.End;
            foundEvent.IsDone = generalEvent.IsDone;

            int numberOfChangedObjects = await db.SaveChangesAsync();
           
            if (numberOfChangedObjects != 1) throw new InvalidOperationException("[ERROR - GeneralEventRepository: UpdateGeneralEvent()] More than one event objects were updated!");

            await db.SaveChangesAsync();

            return new GeneralEvent(
                foundEvent.Id,
                foundEvent.UserAccountId,
                foundEvent.Title,
                foundEvent.Notes,
                foundEvent.MeetingPlace,
                foundEvent.Start,
                foundEvent.End,
                foundEvent.IsDone,
                foundEvent.GeneralEventCreated
            );
        }
        catch (DbUpdateException ex)
        {
            throw new PersistanceExeption("[ERROR - GeneralEventRepository: UpdateGeneralEvent()] Error when trying to update media event:", ex);
        }
    }

    public async Task<GeneralEventEntity> DeleteGeneralEvent(Guid userId, Guid eventId)
    {
        try
        {
            GeneralEventEntity entity = await GetGeneralEventByIdAsEntity(userId, eventId);

            db.GeneralEvents.Remove(entity);
            await db.SaveChangesAsync();
            return entity;
        }
        catch (DbUpdateException ex)
        {
            throw new PersistanceExeption("[ERROR - GeneralEventRepository: DeleteGeneralEvent()] Error when trying to delete general event:", ex);
        }
    }
}