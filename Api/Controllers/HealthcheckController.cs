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
    [Route("/")]
    public class HealthCheckController : ControllerBase
    {
        [HttpGet]
        public IActionResult Health()
        {
            return Ok("Successful");
        }
    }
}