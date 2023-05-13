namespace Common.Models.Core;

public class Contract
{
    public int Id { get; set; }
    public int ClientId { get; set; }
    public int SeoId { get; set; }
    public int Type { get; set; }
    public int Plan { get; set; }
    public int Status { get; set; }
    public string ManagedBy { get; set; } = string.Empty;
    public DateTime DateCreated { get; set; } = DateTime.Now;
    public DateTime DateUpdated { get; set; } = DateTime.Now;
}