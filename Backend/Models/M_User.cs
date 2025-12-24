namespace Backend.Models
{
    public class M_User
    {
        public required Guid ID { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string PictureUrl { get; set; }
        public required string GoogleID { get; set; }

        public ICollection<M_MediaEvent> MediaEvents { get; set; } = [];
        public ICollection<M_LoginHistory> LoginHistories { get; set; } = [];
    }
}
