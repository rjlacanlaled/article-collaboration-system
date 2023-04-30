namespace Common.Models.Request;

public record AddContractPaymentRequest
{
    public int ContractId { get; init; }
    public int ClientId { get; init; }
    public string Link { get; init; } = string.Empty;
    public decimal Amount { get; init; }
    public DateTime Date { get; init; }
}