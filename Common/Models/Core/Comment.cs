namespace Common.Models.Core;

public class Comment {

    public int Id {get; init;}

    public int TaskId {get; init;}

    public int UserId {get; init;}

    public string Message {get; set;} = string.Empty;

    public DateTime DateCreated { get; set; } = DateTime.Now;

    public DateTime DateUpdated { get; set; } = DateTime.Now;

    public int CommentId { get; init; }

}