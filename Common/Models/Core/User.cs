namespace Common.Models.Core;

public class User
{
    public int Id { get; init; }
    public string Username { get; init; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}