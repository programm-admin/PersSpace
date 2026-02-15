public sealed record MediaEventResult(
    Guid Id,
    string Title,
    DateTime Start,
    DateTime End,
    bool isDone
);