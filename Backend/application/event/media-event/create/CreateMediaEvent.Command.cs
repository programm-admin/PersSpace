namespace Application.MediaEvents.Create;

public sealed record CreateMediaEventCommand(
    Guid UserAccountId,
    string Title,
    string Notes,
    DateTime Start,
    DateTime End,
    bool IsDone
);