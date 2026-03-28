namespace Application.GeneralEvents.Delete;

public sealed record DeleteGeneralEventCommand(Guid EventId, Guid UserAccountId);