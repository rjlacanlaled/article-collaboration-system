using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Google;
using Asp.Versioning;

namespace Api.Controllers
{
    [ApiController]
    [ApiVersion(1.0)]
    [Route("api/v{versionNumber}[controller]")]
    public class LoginController : ControllerBase
    {
        [AllowAnonymous]
        [HttpPost("google")]
        public async Task<IActionResult> GoogleLoginAsync()
        {
            var result = await HttpContext.AuthenticateAsync(GoogleDefaults.AuthenticationScheme);

            if (result.Succeeded)
            {
                return Ok("Login successful!");
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}