namespace Common.Models.Request;

public record AddProjectTaskAssigneeRequest
{
    public int ProjectTaskId { get; init; }
    public int UserId { get; init; }
    public int RoleId { get; init; }
}