using Common.Models.Enums;

namespace Common.Models.Request;

public record AddProjectTaskRequest
{
    public string Title { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public ProjectTaskStatus Status { get; init; }
    public int Type { get; init; }
    public int Words { get; init; }
    public int Timeliness { get; init; }
    public int ContractId { get; init; }
    public string? Link { get; init; }
    public DateTime ProductionDate { get; init; }
    public DateTime SeoDeadline { get; init; }
}