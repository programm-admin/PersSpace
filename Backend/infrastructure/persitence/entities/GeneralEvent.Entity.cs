using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Entities;

public class GeneralEventEntity
{
    [Key]
    public required Guid Id { get; set; }
    public required Guid UserAccountId { get; set; }
    public required string Title { get; set; } = null!;
    public string? Notes { get; set; }
    public string? MeetingPlace {get; set;}
    public required DateTime Start { get; set; }
    public required DateTime End { get; set; }
    public required bool IsDone { get; set; } = false;
    public required DateTime GeneralEventCreated { get; set; }

    // foreign key
    public UserEntity? User { get; set; }
}