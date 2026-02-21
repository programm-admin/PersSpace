namespace Domain.MediaEvents;

public class MediaEvent : MediaEventBase
{
    public Guid ID { get; set; }
    public Guid UserAccountID { get; set; }


    public MediaEvent(
        Guid id,
        Guid userAccountId,
        string title,
        string? notes,
        DateTime start,
        DateTime end,
        bool isDone,
        DateTime mediaEventCreated
    )
    {
        if (string.IsNullOrWhiteSpace(title)) throw new ArgumentException("[ERROR - MediaEventConstructor] Title must be set!");
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
        string? notes,
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