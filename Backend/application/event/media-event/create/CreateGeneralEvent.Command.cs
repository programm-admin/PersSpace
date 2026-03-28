namespace Application.GeneralEvents.Create;

public sealed record CreateGeneralEventCommand(
    Guid UserAccountId,
    string Title,
    string Notes,
    string MeetingPlace,
    DateTime Start,
    DateTime End,
    bool IsDone
);