namespace Common.Models.Request;

public record AddContractRequest
{
    public string ClientEmail { get; init; }
    public string SeoEmail { get; init; }
    public int Type { get; init; }
    public int Plan { get; init; }
    public int Status { get; init; }
    public string ManagedBy { get; init; } = string.Empty;
}