namespace Application.MediaEvents.Delete;

public sealed record DeleteMediaEventCommand(Guid EventId, Guid UserAccountId);