namespace Common.Models.Core;

public class ProjectAssigneeRole
{
    public int UserId { get; init; }
    public string? FirstName { get; init; }
    public string? LastName { get; init; }
    public int RoleId { get; init; }
    public string? Role { get; init; }
}