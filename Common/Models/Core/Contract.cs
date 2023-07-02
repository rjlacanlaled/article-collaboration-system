namespace Common.Models.Core;

public class Contract
{
    public int Id { get; set; }
    public string ClientEmail { get; set; }
    public string SeoEmail { get; set; }
    public int Type { get; set; }
    public int Plan { get; set; }
    public int PaymentStatus { get; set; }
    public double PaymentAmount { get; set; }
    public string ManagedBy { get; set; } = string.Empty;
    public DateTime PaymentDate { get; set; } = DateTime.Now;
    public DateTime DateCreated { get; set; } = DateTime.Now;
    public DateTime DateUpdated { get; set; } = DateTime.Now;
}