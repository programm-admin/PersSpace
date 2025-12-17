namespace Backend.Models
{
    public class M_User
    {
        public required string ID { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string PictureUrl { get; set; }

        public ICollection<M_Event> Events { get; set; } = [];
        public ICollection<M_LoginHistory> LoginHistories { get; set; } = [];
        public ICollection<M_RefreshToken> RefreshTokens { get; set; } = [];
    }
}
