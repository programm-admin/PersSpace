
using Domain.GeneralEvents;
using Infrastructure.Entities;

namespace Infrastructure.Mappers;

public static class GeneralEventMapper
{
    public static GeneralEventEntity ToEntity(GeneralEvent domainEvent)
    {
        return new GeneralEventEntity
        {
            Id = domainEvent.ID,
            UserAccountId = domainEvent.UserAccountID,
            Title = domainEvent.Title,
            Notes = domainEvent.Notes,
            MeetingPlace = domainEvent.MeetingPlace,
            Start = domainEvent.Start,
            End = domainEvent.End,
            IsDone = domainEvent.IsDone,
            GeneralEventCreated = domainEvent.GeneralEventCreated
        };
    }

    public static GeneralEvent ToDomain(GeneralEventEntity entityEvent)
    {
        return new GeneralEvent
        (
            entityEvent.Id,
            entityEvent.UserAccountId,
            entityEvent.Title,
            entityEvent.Notes,
            entityEvent.MeetingPlace,
            entityEvent.Start,
            entityEvent.End,
            entityEvent.IsDone,
            entityEvent.GeneralEventCreated
        );
    }
}