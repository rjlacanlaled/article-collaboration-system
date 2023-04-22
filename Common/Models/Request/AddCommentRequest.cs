namespace Common.Models.Request;

public record AddCommentRequest
{
    public int TaskId { get; init; }
    public int? UserId { get; init; }
    public string Message { get; init; } = string.Empty;
}