namespace Domain;

public class User
{
    public Guid ID { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string PictureUrl { get; set; }
    public string GoogleID { get; set; }

    public User(
        Guid id,
        string name,
        string email,
        string pictureUrl,
        string googleID
    )
    {
        ID = id;
        Name = name;
        Email = email;
        PictureUrl = pictureUrl;
        GoogleID = googleID;
    }

    public void UpdateUser(
        string name,
        string email,
        string pictureUrl
    )
    {
        Name = name;
        Email = email;
        PictureUrl = pictureUrl;
    }
}