namespace Backend.Models
{
    public class M_MediaEvent
    {
        public required string ID { get; set; }
        public required string UserAccountID { get; set; }
        public required string Title { get; set; }
        public required string Notes { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsDone { get; set; }
        public DateTime MediaEventCreated { get; set; }

        public M_User? User { get; set; }
    }
}
