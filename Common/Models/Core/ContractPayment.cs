namespace Common.Models.Core;

public class ContractPayment
{
    public int Id { get; init; }
    public int ContractId { get; init; }
    public string Link { get; init; } = string.Empty;
    public decimal Amount { get; init; }
    public DateTime PaymentDate { get; init; }
}

