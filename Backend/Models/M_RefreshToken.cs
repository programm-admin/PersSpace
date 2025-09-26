namespace Backend.Models
{
    public class M_RefreshToken
    {
        public string Id { get; set; }
        public string Token { get; set; }
        public DateTime ExpiresAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime RevokedAt { get; set; }
        public string? ParentId { get; set; }
        public string UserAccountID { get; set; }
        
        public M_User User { get; set; }
    }
}
