namespace Common.Models.Core;

public class Contract
{
    public int Id { get; init; }
    public int ClientId { get; init; }
    public int SeoId { get; init; }
    public int Type { get; set; }
    public int Plan { get; set; }
    public int Status { get; set; }
    public string ManagedBy { get; set; } = string.Empty;
    public DateTime DateCreated { get; set; } = DateTime.Now;
    public DateTime DateUpdated { get; set; } = DateTime.Now;
}