namespace Common.Models.Core;

public class ProjectTask
{
    public int Id { get; init; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Status { get; set; }
    public int Type { get; set; }
    public int Words { get; set; }
    public int Timeliness { get; set; }
    public int ContractId { get; init; }
    public List<Comment>? Comments { get; init; } = new();
}