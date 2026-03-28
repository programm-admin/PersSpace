namespace Domain.GeneralEvents;

public abstract class GeneralEventBase
{
    public string Title { get; set; }
    public string? Notes { get; set; }
    public string? MeetingPlace {get; set;}
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
    public bool IsDone { get; set; }
    public DateTime GeneralEventCreated { get; set; }

    protected GeneralEventBase(
        string title,
        string? notes,
        string? meetingPlace,
        DateTime start,
        DateTime end,
        bool isDone,
        DateTime generalEventCreated
    )
    {
        Title = title ?? throw new ArgumentNullException("[ERROR - MediaEventBase: protected Constructor] Title is not set.");
        Notes = notes;
        MeetingPlace = meetingPlace;
        Start = start;
        End = end;
        IsDone = isDone;
        GeneralEventCreated = generalEventCreated;
    }
}