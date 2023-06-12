namespace Common.Models.Request;

public record AddProjectTaskAssigneeRequest
{
    public int ProjectTaskId { get; init; }
    public string UserId { get; init; }
    public string RoleId { get; init; }
}