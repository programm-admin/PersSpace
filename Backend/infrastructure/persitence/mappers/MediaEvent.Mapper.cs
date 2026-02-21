using Domain.MediaEvents;
using Infrastructure.Entities;

namespace Infrastructure.Mappers;

public static class MediaEventMapper
{
    public static MediaEventEntity ToEntity(MediaEvent domainEvent)
    {
        return new MediaEventEntity
        {
            Id = domainEvent.ID,
            UserAccountId = domainEvent.UserAccountID,
            Title = domainEvent.Title,
            Notes = domainEvent.Notes,
            Start = domainEvent.Start,
            End = domainEvent.End,
            IsDone = domainEvent.IsDone,
            MediaEventCreated = domainEvent.MediaEventCreated
        };
    }

    public static MediaEvent ToDomain(MediaEventEntity entityEvent)
    {
        return new MediaEvent
        (
            entityEvent.Id,
            entityEvent.UserAccountId,
            entityEvent.Title,
            entityEvent.Notes,
            entityEvent.Start,
            entityEvent.End,
            entityEvent.IsDone,
            entityEvent.MediaEventCreated
        );
    }
}