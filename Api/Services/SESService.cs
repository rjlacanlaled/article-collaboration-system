using Amazon.SimpleEmail;
using Amazon.SimpleEmail.Model;
using Common.Models.Mail;
using Microsoft.Extensions.Options;

namespace Api.Services;
public class SESService : IMailService
{
    private readonly MailSettings _mailSettings;
    private readonly IAmazonSimpleEmailService _mailService;
    private readonly ILogger<SESService> _logger;
    public SESService(IOptions<MailSettings> mailSettings,
        IAmazonSimpleEmailService mailService, ILogger<SESService> logger)
    {
        _mailSettings = mailSettings.Value;
        _mailService = mailService;
        _logger = logger;
    }
    public async Task SendEmailAsync(MailRequest mailRequest)
    {
        try
        {
            _logger.LogInformation("Sending email");
            var mailBody = new Body(new Content(mailRequest.Body));
            var message = new Message(new Content(mailRequest.Subject), mailBody);
            var destination = new Destination(mailRequest.ToEmail);
            var request = new SendEmailRequest(_mailSettings.Mail, destination, message);
            await _mailService.SendEmailAsync(request);
            _logger.LogInformation("Email sent");
        }
        catch (Exception ex)
        {
            _logger.LogInformation(ex.ToString());
        }
    }
}