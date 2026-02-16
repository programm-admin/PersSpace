namespace Application.MediaEvents.Update;

public sealed record UpdateMediaEventCommand(
    Guid EventId,
    Guid UserAccountId,
    string Title,
    string Notes,
    DateTime Start,
    DateTime End,
    bool IsDone
);