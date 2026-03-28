namespace Domain.GeneralEvents;

public class GeneralEvent : GeneralEventBase
{
    public Guid ID { get; set; }
    public Guid UserAccountID { get; set; }


    public GeneralEvent(
        Guid id,
        Guid userAccountId,
        string title,
        string? notes,
        string? meetingPlace,
        DateTime start,
        DateTime end,
        bool isDone,
        DateTime generalEventCreated
    ) : base(title, notes, meetingPlace, start, end, isDone, generalEventCreated)
    {
        if (end < start) throw new ArgumentException("[ERROR - MediaEventConstructor] End must be greater or equal to start!");

        ID = id;
        UserAccountID = userAccountId;
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