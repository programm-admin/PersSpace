namespace Domain.Events.MediaEvent;

public class MediaEvent
{
    public Guid ID { get; set; }
    public Guid UserAccountID { get; set; }
    public string Title { get; set; }
    public string Notes { get; set; }
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
    public bool IsDone { get; set; }
    public DateTime MediaEventCreated { get; set; }


    public MediaEvent(
        Guid id,
        Guid userAccountId,
        string title,
        string notes,
        DateTime start,
        DateTime end,
        bool isDone,
        DateTime mediaEventCreated
    )
    {
        if (end < start) throw new ArgumentException("[ERROR - MediaEventConstructor] End must be greater or equal to start!");

        ID = id;
        UserAccountID = userAccountId;
        Title = title;
        Notes = notes;
        Start = start;
        End = end;
        IsDone = isDone;
        MediaEventCreated = mediaEventCreated;
    }


    public void UpdateMediaEvent(
        string title,
        string notes,
        DateTime start,
        DateTime end,
        bool isDone
    )
    {
        if (end < start) throw new ArgumentException("[ERROR - MediaEventConstructor] End must be greater or equal to start!");

        Title = title;
        Notes = notes;
        Start = start;
        End = end;
        IsDone = isDone;
    }
}