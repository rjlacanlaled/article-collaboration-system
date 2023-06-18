namespace Common.Models.Request;

public record AddProjectTaskAssigneeRequest
{
    public int ProjectTaskId { get; init; }
    public string UserEmail { get; init; }
    public string RoleName { get; init; }
}