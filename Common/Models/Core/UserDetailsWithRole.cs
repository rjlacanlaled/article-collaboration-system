namespace Common.Models.Core;

public class UserDetailWithRole
{
    public int UserId { get; set; } = new();
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Role { get; set; }
    public DateTime RegistrationDate { get; set; }
}