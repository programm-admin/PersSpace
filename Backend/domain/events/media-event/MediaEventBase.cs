namespace Domain.MediaEvents;

public abstract class MediaEventBase
{
    public required string Title { get; set; }
    public string? Notes { get; set; }
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
    public bool IsDone { get; set; }
    public DateTime MediaEventCreated { get; set; }
}