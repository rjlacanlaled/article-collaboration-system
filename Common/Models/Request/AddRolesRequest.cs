namespace Common.Models.Request;

public record AddRolesRequest
{
    public string Name { get; set; } = string.Empty;
}