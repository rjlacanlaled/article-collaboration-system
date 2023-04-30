namespace Common.Models.Core;

public class NotificationAssignee
{
    public int Id { get; set; }
    public int NotificationId { get; set; }
    public int UserId { get; set; }
    public bool Seen { get; set; }
    public bool EmailSent { get; set; }
    public DateTime DateSent { get; set; }
}