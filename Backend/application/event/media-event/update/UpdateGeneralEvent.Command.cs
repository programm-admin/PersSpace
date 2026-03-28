namespace Application.GeneralEvents.Update;

public sealed record UpdateGeneralEventCommand(
    Guid EventId,
    Guid UserAccountId,
    string Title,
    string? Notes,
    string? MeetingPlace,
    DateTime Start,
    DateTime End,
    bool IsDone
);