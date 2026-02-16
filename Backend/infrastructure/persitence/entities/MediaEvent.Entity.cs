using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Entities;

public class MediaEventEntity
{
    [Key]
    public required Guid Id { get; set; }
    public required Guid UserAccountId { get; set; }
    public required string Title { get; set; } = null!;
    public string? Notes { get; set; }
    public required DateTime Start { get; set; }
    public required DateTime End { get; set; }
    public required bool IsDone { get; set; } = false;
    public required DateTime CreatedAt { get; set; }

    [ForeignKey(nameof(UserAccountId))]
    public UserEntity? User { get; set; }
}