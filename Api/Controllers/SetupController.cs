using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Google;
using Asp.Versioning;
using Google.Apis.Auth;
using Sink.Data;
using Microsoft.AspNetCore.Identity;
using Data;
using Microsoft.EntityFrameworkCore;
using Common.Models.Core;
using Api.Services;
using Common.Models.Mail;

namespace Api.Controllers
{
    [ApiController]
    [ApiVersion(1.0)]
    [Route("api/v{versionNumber}/[controller]")]
    public class SetupController : ControllerBase
    {
        private readonly ApplicationContext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ILogger<SetupController> _logger;
        private readonly IMailService _mailService;

        public SetupController(ApplicationContext dbContext,
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole> roleManager,
        IMailService mailService,
        ILogger<SetupController> logger)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _roleManager = roleManager;
            _logger = logger;
            _mailService = mailService;
        }

        [HttpGet("roles/all")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin, TopManagement")]
        public IActionResult GetAllRoles()
        {
            var roles = _roleManager.Roles.Select(x => x.Name).ToList();
            return Ok(roles);
        }

        [HttpGet("roles/{roleName}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetRole([FromRoute] string roleName)
        {
            var role = await _roleManager.FindByNameAsync(roleName);
            return Ok(role);
        }

        [HttpGet("users/all")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("users/{roleName}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetAllUsers([FromRoute] string roleName)
        {
            var users = await _userManager.GetUsersInRoleAsync(roleName);
            return Ok(users);
        }

        // ADD POST
        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin, TopManagement")]
        public async Task<IActionResult> CreateRole(string name)
        {
            // Check if role exists
            var roleExist = await _roleManager.RoleExistsAsync(name);

            if (!roleExist)
            {
                var roleResult = await _roleManager.CreateAsync(new IdentityRole(name));

                if (roleResult.Succeeded)
                {
                    _logger.LogInformation("Role added successfully!");
                    return Ok(name);
                }
                else
                {
                    return BadRequest("Something went wrong!");
                }
            }
            else
            {
                return BadRequest(new { error = "Role already exist!" });
            }
        }

        [HttpPost("role/user")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin, TopManagement")]
        public async Task<IActionResult> AddRole([FromBody] UserRoleUpdate updatedRole)
        {
            var user = await _userManager.FindByEmailAsync(updatedRole.Email);

            if (user is null)
            {
                return BadRequest("User does not exist!");
            }

            var role = await _roleManager.FindByNameAsync(updatedRole.RoleName);

            if (role is null)
            {
                return BadRequest("Role does not exist");
            }

            var userRoles = await _userManager.GetRolesAsync(user);

            foreach (var userRole in userRoles)
            {
                _logger.LogInformation(userRole);
            }

            await _userManager.RemoveFromRolesAsync(user, userRoles);

            var addRoleResult = await _userManager.AddToRoleAsync(user, updatedRole.RoleName);

            if (addRoleResult.Succeeded)
            {
                MailRequest mailRequest = new()
                {
                    ToEmail = new List<string>() { user.Email! },
                    Subject = " Welcome to Searchworks!",
                    Body = $@"
Dear {user.FirstName + " " + user.LastName},

Your account approval request for the role {updatedRole.RoleName} has been approved.

If you have any questions or need assistance, please feel free to reach out to us at support@searchworks.xyz.

Best regards,
Searchworks
"
                };

                await _mailService.SendEmailAsync(mailRequest);

                return Ok(user);
            }
            else
            {
                return BadRequest("Something went wrong");
            }
        }

        [HttpGet("user/role/{email}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin, TopManagement")]
        public async Task<IActionResult> GetUserRoles(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user is null)
            {
                return BadRequest("User does not exist!");
            }

            var roles = await _userManager.GetRolesAsync(user);

            return Ok(roles);
        }

        // DELETE / REJECT USER
        [HttpDelete("role/remove/user/{email}/role/{roleName}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin, TopManagement")]
        public async Task<IActionResult> RemoveRole(string email, string roleName)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user is null)
            {
                return BadRequest("User does not exist!");
            }

            var role = await _roleManager.FindByNameAsync(roleName);

            if (role is null)
            {
                return BadRequest("Role does not exist");
            }

            var removeRoleResult = await _userManager.RemoveFromRoleAsync(user, roleName);

            if (removeRoleResult.Succeeded)
            {
                await _userManager.DeleteAsync(user);

                MailRequest mailRequest = new()
                {
                    ToEmail = new List<string>() { user.Email! },
                    Subject = "Account Approval Rejected",
                    Body = $@"
Dear {user.FirstName + " " + user.LastName},

We regret to inform you that your account approval request has been rejected. We appreciate your interest, but unfortunately, we are unable to approve your account at this time.

If you have any questions or require further information, please feel free to reach out to our support team at support@searchworks.xyz.

Thank you for your understanding.

Best regards,
Searchworks
"
                };

                await _mailService.SendEmailAsync(mailRequest);

                return Ok(user);
            }
            else
            {
                return BadRequest("Something went wrong");
            }
        }
    }
}