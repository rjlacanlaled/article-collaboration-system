namespace Common.Models.Mail;

public class MailRequest
{
    public List<string> ToEmail { get; set; } = new();
    public string Subject { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
}