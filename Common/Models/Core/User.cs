namespace Common.Models.Core;

public class User
{
    public int Id { get; init; }
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public bool IsAdmin { get; set; }
    public bool IsApproved { get; set; }
}