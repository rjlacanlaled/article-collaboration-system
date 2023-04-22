namespace Common.Models.Core;

public class ContractPayment
{
    public int Id { get; set; }
    public int ContractId { get; set; }
    public int ClientId { get; set; }
    public string Link { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime PaymentDate { get; set; }
}

