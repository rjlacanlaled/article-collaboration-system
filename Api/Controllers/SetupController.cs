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

        public SetupController(ApplicationContext dbContext, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ILogger<SetupController> logger)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _roleManager = roleManager;
            _logger = logger;
        }

        [HttpGet("roles/all")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        public IActionResult GetAllRoles()
        {
            var roles = _roleManager.Roles.Select(x => x.Name).ToList();
            return Ok(roles);
        }

        [HttpGet("users/all")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            return Ok(users);
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
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

            // Check if added successfully
        }

        [HttpPost("role/user")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
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
                return Ok(user);
            }
            else
            {
                return BadRequest("Something went wrong");
            }
        }

        [HttpGet("user/role/{email}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
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

        [HttpPost("role/remove/user/{email}/role/{roleName}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
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
                return Ok(user);
            }
            else
            {
                return BadRequest("Something went wrong");
            }
        }
    }
}