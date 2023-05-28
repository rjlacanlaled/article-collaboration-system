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

        [HttpGet]
        public IActionResult GetAllRoles()
        {
            var roles = _roleManager.Roles.ToList();
            return Ok(roles);
        }

        [HttpGet("users/all")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            return Ok(users);
        }

        [HttpPost]
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
        public async Task<IActionResult> AddRole(string email, string roleName)
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

            var addRoleResult = await _userManager.AddToRoleAsync(user, roleName);

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

        [HttpPost("login/google")]
        [AllowAnonymous]
        public async Task<IActionResult> GoogleLoginAsync([FromBody] string token)
        {
            try
            {
                var googleUser = await GoogleJsonWebSignature.ValidateAsync(token, new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new[] { "710035087649-jes0lm5uk9m05cn8lfj71ihv6c6a4d4g.apps.googleusercontent.com" }
                });

                Console.WriteLine(googleUser);
                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                return BadRequest();
            }
        }

        [HttpPost("signup/google")]
        [AllowAnonymous]
        public async Task<IActionResult> GoogleSignupAsync([FromBody] string token)
        {
            _logger.LogInformation("Here");
            try
            {
                var googleUser = await GoogleJsonWebSignature.ValidateAsync(token, new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new[] { "710035087649-jes0lm5uk9m05cn8lfj71ihv6c6a4d4g.apps.googleusercontent.com" }
                });

                var userExist = await _userManager.FindByEmailAsync(googleUser.Email);

                if (userExist is not null)
                {
                    return BadRequest("User already exist!");
                }
                else
                {
                    var user = new ApplicationUser { UserName = googleUser.Email };
                    var newUser = await _userManager.CreateAsync(user);
                    var userDetails = new UserDetail { UserEmail = googleUser.Email, FirstName = googleUser.GivenName, LastName = googleUser.FamilyName, Picture = googleUser.Picture };
                    var newUserDetails = await _dbContext.UserDetails.AddAsync(userDetails);
                    await _dbContext.SaveChangesAsync();
                    return Ok(newUser);
                }
            }
            catch (Exception e)
            {
                _logger.LogInformation(e.ToString());
                return BadRequest(e.ToString());
            }
        }
    }
}