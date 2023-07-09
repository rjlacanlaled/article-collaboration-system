using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Google;
using Asp.Versioning;
using Google.Apis.Auth;
using Api.Services;
using Common.Models.Core;
using Microsoft.Extensions.Options;
using Common.Models.Mail;
using Microsoft.AspNetCore.Identity;
using Data;

namespace Api.Controllers
{
    [ApiController]
    [ApiVersion(1.0)]
    [Route("api/v{versionNumber}/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly IMailService _mailService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<AuthController> _logger;

        public AuthController(AuthService authService, IMailService mailService, UserManager<ApplicationUser> userManager, ILogger<AuthController> logger)
        {
            _authService = authService;
            _mailService = mailService;
            _userManager = userManager;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(Login login)
        {
            if (!ModelState.IsValid) return BadRequest("InvalidPayload");
            var (status, message) = await _authService.Login(login);
            if (status == 0) return BadRequest(message);
            return Ok(message);
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(Registration registration)
        {
            if (!ModelState.IsValid) return BadRequest("InvalidPayload");
            var role = registration.Email == "searchworks.xyz@gmail.com" || registration.Email == "admin@searchworks.xyz" ? "Admin" : "Unassigned";
            var (status, message) = await _authService.Register(registration, role);
            if (status == 0) return BadRequest(message);

            // Send Email
            // public string? ToEmail { get; set; }
            // public string? Subject { get; set; }
            // public string? Body { get; set; }

            var adminAccounts = await _userManager.GetUsersInRoleAsync("Admin");


            if (adminAccounts is not null)
            {
                var adminEmails = adminAccounts.Select(a => a.Email).ToList();

                if (adminEmails is not null)
                {
                    MailRequest mailRequest = new()
                    {
                        ToEmail = adminEmails!,
                        Subject = "New User Registration Approval Request",
                        Body = $@"
A new user registration has been submitted and requires your approval. Please review the details below:

User Information:
Name: {registration.FirstName + " " + registration.LastName}
Email: {registration.Email}
Username: {registration.Username}

To approve this user, please follow the link below:
https://searchworks.xyz/pending

Thank you for your attention to this matter.

Best regards,
Searchworks
                            "
                    };
                    await _mailService.SendEmailAsync(mailRequest);
                }
            }

            return Ok(message);
        }
    }
}