namespace Application.MediaEvents.GetSingle;

public sealed record GetMediaEventCommand(
    Guid UserAccountID,
    Guid MediaEventID
);