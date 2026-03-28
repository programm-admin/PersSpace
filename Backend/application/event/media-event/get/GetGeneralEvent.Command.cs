namespace Application.GeneralEvents.GetSingle;

public sealed record GetGeneralEventCommand(
    Guid UserAccountID,
    Guid MediaEventID
);