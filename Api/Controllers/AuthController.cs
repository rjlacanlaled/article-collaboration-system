using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Google;
using Asp.Versioning;
using Google.Apis.Auth;
using Api.Services;
using Common.Models.Core;

namespace Api.Controllers
{
    [ApiController]
    [ApiVersion(1.0)]
    [Route("api/v{versionNumber}/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
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
            var role = registration.Email == "admin_searchworks@gmail.com" || registration.Email == "admin_searchworks@yahoo.com" ? "Admin" : "Unassigned";
            var (status, message) = await _authService.Register(registration, role);
            if (status == 0) return BadRequest(message);
            return Ok(message);
        }
    }
}