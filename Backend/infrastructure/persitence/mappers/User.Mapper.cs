using Domain;
using Infrastructure.Entities;

namespace Infrastructure.Mappers;

public static class UserMapper
{
    public static UserEntity ToEntity(User user)
    {
        return new UserEntity
        {
            ID = user.ID,
            Name = user.Name,
            Email = user.Email,
            PictureUrl = user.PictureUrl,
            GoogleID = user.GoogleID
        };
    }

    public static User ToDomain(UserEntity entity)
    {
        return new User(
            entity.ID,
            entity.Name,
            entity.Email,
            entity.PictureUrl,
            entity.GoogleID
        );
    }
}