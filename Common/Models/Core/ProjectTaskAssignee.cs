namespace Common.Models.Core;

public class ProjectTaskAssignee
{
    public int Id { get; init; }
    public int ProjectTaskId { get; set; }
    public string UserId { get; set; }
    public string RoleId { get; set; }
}