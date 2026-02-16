public sealed record MediaEventResult(
    Guid Id,
    string Title,
    string notes,
    DateTime Start,
    DateTime End,
    bool isDone
);