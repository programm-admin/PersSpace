namespace Domain.MediaEvents;

public abstract class MediaEventBase
{
    public string Title { get; set; }
    public string? Notes { get; set; }
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
    public bool IsDone { get; set; }
    public DateTime MediaEventCreated { get; set; }

    protected MediaEventBase(
        string title,
        string? notes,
        DateTime start,
        DateTime end,
        bool isDone,
        DateTime mediaEventCreated
    )
    {
        Title = title ?? throw new ArgumentNullException("[ERROR - MediaEventBase: protected Constructor] Title is not set.");
        Notes = notes;
        Start = start;
        End = end;
        IsDone = isDone;
        MediaEventCreated = mediaEventCreated;
    }
}