namespace Common.Models.Core;

public class NotificationAssignee {
    public int NotificationId {get; init;}

    public int UserId {get; init;}

    public bool Seen {get; set;}

    public bool EmailSent {get; set;}
}