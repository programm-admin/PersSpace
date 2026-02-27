namespace Api.Request.MediaEvents;

public class CreateMediaEventRequest
{
    public string Title { get; set; } = null!;
    public string Notes { get; set; } = null!;
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
    public bool IsDone { get; set; } = false;
}