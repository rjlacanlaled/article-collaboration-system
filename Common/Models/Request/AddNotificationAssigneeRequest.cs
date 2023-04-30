namespace Common.Models.Request;

public record AddNotificationAssigneeRequest
{
    public int NotificationId { get; init; }
    public int UserId { get; init; }
    public bool Seen { get; init; }
    public bool EmailSent { get; init; }
}