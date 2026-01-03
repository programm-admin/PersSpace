namespace Backend.DataTransferObjects
{
    public class M_MediaEventRequestDTO
    {
        public required string Title { get; set; }
        public required string Notes { get; set; }
        public required DateTime Start { get; set; }
        public required DateTime End { get; set; }
        public required bool IsDone { get; set; }
        public required DateTime EventCreated { get; set; }
    }

    public class M_MediaEventUpdateRequestDTO
    {
        public required string ID { get; set; }
        public required string Title { get; set; }
        public required string Notes { get; set; }
        public required DateTime Start { get; set; }
        public required DateTime End { get; set; }
        public required bool IsDone { get; set; }
        public required DateTime EventCreated { get; set; }
    }
}
