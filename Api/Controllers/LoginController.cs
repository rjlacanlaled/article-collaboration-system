using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Google;
using Asp.Versioning;
using Google.Apis.Auth;

namespace Api.Controllers
{
    [ApiController]
    [ApiVersion(1.0)]
    [Route("api/v{versionNumber}/[controller]")]
    public class LoginController : ControllerBase
    {
        [HttpPost("google/{token}")]
        [AllowAnonymous]
        public async Task<IActionResult> GoogleLoginAsync([FromRoute] string token)
        {
            try
            {
                //return Challenge(properties, provider);
                var googleUser = await GoogleJsonWebSignature.ValidateAsync(token, new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new[] { "710035087649-jes0lm5uk9m05cn8lfj71ihv6c6a4d4g.apps.googleusercontent.com" }
                });
                Console.WriteLine("Here");
                Console.WriteLine(googleUser);
                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                return BadRequest();
            }
        }
    }
}