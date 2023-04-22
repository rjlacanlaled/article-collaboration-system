namespace Common.Models.Core;

public class ProjectTaskAssignee
{
    public int Id { get; init; }
    public int ProjectTaskId { get; set; }
    public int UserId { get; set; }
    public int RoleId { get; set; }
}