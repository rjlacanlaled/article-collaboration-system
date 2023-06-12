using Common.Models.Enums;

namespace Common.Models.Core;

public class ProjectTaskDetails
{
    public int Id { get; init; }
    public int ProjectTaskId { get; set; }
    public string Title { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public ProjectTaskStatus Status { get; init; }
    public int Type { get; init; }
    public int Words { get; init; }
    public int Timeliness { get; init; }
    public int ContractId { get; init; }
    public DateTime DateCreate { get; init; }
    public DateTime DateUpdated { get; init; }
    public List<ProjectAssigneeRole> Assignees { get; set; } = new();
}