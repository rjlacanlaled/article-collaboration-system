using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Common.Models.Identity;
using Data;
using Asp.Versioning;

namespace Api.Controllers
{
    [ApiController]
    [ApiVersion(1.0)]
    [Route("api/v{versionNumber}[controller]")]
    public class SignupController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public SignupController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUserAsync([FromBody] CreateUserModel model)
        {
            var user = new ApplicationUser { UserName = model.Username, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok("User account created successfully.");
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }
    }
}