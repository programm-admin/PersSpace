using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class M_MediaEvent
    {
        [Key]
        public required Guid ID { get; set; }
        public required Guid UserAccountID { get; set; }
        public required string Title { get; set; }
        public required string Notes { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsDone { get; set; }
        public DateTime MediaEventCreated { get; set; }

        [ForeignKey(nameof(UserAccountID))]
        public M_User User { get; set; } = null!;
    }
}
