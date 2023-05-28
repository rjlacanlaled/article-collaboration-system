namespace Common.Models.Core;

public class UserDetail
{
    public int Id { get; init; }
    public int UserId { get; set; } = new();
    public string UserEmail { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string? MiddleName { get; set; }
    public string LastName { get; set; } = string.Empty;
    public string? Address { get; set; }
    public string? Picture { get; set; }
    // public string? ImageUrl { get; set; }
}