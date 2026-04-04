public sealed record GeneralEventResult(
    Guid Id,
    string Title,
    string? Notes,
    string? MeetingPlace,
    DateTime Start,
    DateTime End,
    bool isDone,
    DateTime GeneralEventCreated
);