using Common.Models.Mail;

namespace Api.Services;
public interface IMailService
{
    Task SendEmailAsync(MailRequest mailRequest);
}