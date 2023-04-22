namespace Common.Models.Core;

public class ProjectTaskAssignee
{
    public int Id { get; init; }
    public int ProjectTaskId { get; init; }
    public int UserId { get; init; }
    public int RoleId { get; init; }
}