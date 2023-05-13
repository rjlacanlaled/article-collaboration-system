namespace Common.Models.Request;

public record AddContractRequest
{
    public int ClientId { get; init; }
    public int SeoId { get; init; }
    public int Type { get; init; }
    public int Plan { get; init; }
    public int Status { get; init; }
    public int ManagedBy { get; init; }
}