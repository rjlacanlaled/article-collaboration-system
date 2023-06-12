namespace Common.Models.Core;

public class ProjectAssigneeRole
{
    public string UserId { get; init; }
    public string? FirstName { get; init; }
    public string? LastName { get; init; }
    public string RoleId { get; init; }
    public string? Role { get; init; }
}