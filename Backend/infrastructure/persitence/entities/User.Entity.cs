using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Entities;

public class UserEntity
{
    [Key]
    public Guid ID { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string PictureUrl { get; set; }
    public required string GoogleID { get; set; }

    public ICollection<MediaEventEntity> MediaEvents { get; set; } = new List<MediaEventEntity>();
}