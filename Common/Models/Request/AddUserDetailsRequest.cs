namespace Common.Models.Request;

public record AddUserDetailsRequest
{
    public int UserId { get; init; } = new();
    public string FirstName { get; set; } = string.Empty;
    public string? MiddleName { get; set; }
    public string LastName { get; set; } = string.Empty;
    public string? Address { get; set; }
}