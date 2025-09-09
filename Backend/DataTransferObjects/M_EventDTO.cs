namespace Backend.DataTransferObjects
{
    public class M_EventDTO
    {
        public string ID { get; set; }
        public string UserAccountID { get; set; }
        public string Title { get; set; }
        public string Notes { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsDone { get; set; }
        public DateTime EventCreated { get; set; }
    }
}
