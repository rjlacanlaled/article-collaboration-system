namespace Common.Models.Core;

public class NotificationAssignee
{
    public int Id { get; init; }
    public int NotificationId { get; init; }
    public int UserId { get; init; }
    public bool Seen { get; set; }
    public bool EmailSent { get; set; }
}