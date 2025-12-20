namespace Backend.Models
{
    public class M_LoginHistory
    {
        public required string ID { get; set; }
        public required string UserAccountID { get; set; }
        public required DateTime Login { get; set; }
    }
}
