namespace Backend.Models
{
    public class M_User
    {
        public string ID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PictureUrl { get; set; }

        public ICollection<M_Event> Events { get; set; } = new List<M_Event>();
        public ICollection<M_LoginHistory> LoginHistories { get; set; } = new List<M_LoginHistory>();
        public ICollection<M_RefreshToken> RefreshTokens { get; set; } = new List<M_RefreshToken>();
    }
}
