namespace Common.Models.Core;

public class ProjectTaskAssignee
{
    public int Id { get; init; }
    public int ProjectTaskId { get; set; }
    public string UserEmail { get; set; }
    public string RoleName { get; set; }
}