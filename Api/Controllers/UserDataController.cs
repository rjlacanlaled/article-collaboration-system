using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Google;
using Asp.Versioning;
using Sink.Data;
using Common.Models.Core;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Common.Models.Request;
using Microsoft.EntityFrameworkCore.Internal;
using System.Reflection;
using Microsoft.AspNetCore.Identity;
using Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Api.Controllers;

[ApiController]
[ApiVersion(1.0)]
[Route("api/v{versionNumber}/[controller]")]
public class UserDataController : ControllerBase
{
    private readonly ApplicationContext _dbContext;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly ILogger<UserDataController> _logger;

    public UserDataController(ApplicationContext dbContext, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ILogger<UserDataController> logger)
    {
        _dbContext = dbContext;
        _userManager = userManager;
        _roleManager = roleManager;
        _logger = logger;
    }

    [HttpPut("details/update/email/{email}")]
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    public async Task<IActionResult> UpdateAsync([FromRoute] string email, [FromBody] AddUsersRequest addUsersRequest)
    {
        if (!ModelState.IsValid) return BadRequest("Bad data");

        var user = await _userManager.FindByEmailAsync(email);

        if (user is null) return BadRequest("User does not exist!");

        user.FirstName = addUsersRequest.FirstName;
        user.LastName = addUsersRequest.LastName;
        user.MiddleName = addUsersRequest.MiddleName;

        var updateUserResult = await _userManager.UpdateAsync(user);

        if (!updateUserResult.Succeeded) return BadRequest("Unable to update user, please check details and try again");

        return Ok();
    }

    [HttpPut("role/update/email/{email}/role/{role}")]
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    public async Task<IActionResult> UpdateRoleAsync([FromRoute] string email, [FromRoute] string role)
    {
        if (!ModelState.IsValid) return BadRequest("Bad data");

        var user = await _userManager.FindByEmailAsync(email);

        if (user is null) return BadRequest("User does not exist!");

        var roleExist = await _roleManager.FindByNameAsync(role);

        if (roleExist is null) return BadRequest("Role does not exist");

        var userRoles = await _userManager.GetRolesAsync(user);

        await _userManager.RemoveFromRolesAsync(user, userRoles);
        await _userManager.AddToRoleAsync(user, role);

        return Ok();
    }

    // Read
    [HttpGet("email/{email}")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public async Task<IActionResult> FetchAsync([FromRoute] string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user is null) return BadRequest("User does not exist");

        var roles = await _userManager.GetRolesAsync(user);

        var accessToken = Request.Headers["Authorization"].ToString().Replace("Bearer", "").Trim();
        var handler = new JwtSecurityTokenHandler();
        var token = handler.ReadJwtToken(accessToken);

        var ownerUsername = token.Claims.ToList().Find(x => x.Type.ToString() == "unique_name")?.Value;
        var ownerUser = await _userManager.FindByNameAsync(ownerUsername);
        var ownerRoles = await _userManager.GetRolesAsync(ownerUser);

        if (ownerUser is null) return BadRequest("Token expired! Please relogin...");
        _logger.LogInformation("Email = " + user.Email);
        _logger.LogInformation("OwnerEmail = " + ownerUser.Email);

        if (ownerUser.Email.ToLower() == user.Email!.ToLower())
        {
            return Ok(new { User = user, Roles = roles });
        }
        else
        {
            if (ownerRoles.Contains("Admin"))
            {
                return Ok(new { User = user, Roles = roles });
            }

            return Unauthorized();
        }
    }

    // Read
    [HttpPost("email/{email}")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public async Task<IActionResult> UpdateUserAsync([FromRoute] string email, [FromBody] BasicUserData data)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user is null) return BadRequest("User does not exist");

        var roles = await _userManager.GetRolesAsync(user);

        var accessToken = Request.Headers["Authorization"].ToString().Replace("Bearer", "").Trim();
        var handler = new JwtSecurityTokenHandler();
        var token = handler.ReadJwtToken(accessToken);

        var ownerUsername = token.Claims.ToList().Find(x => x.Type.ToString() == "unique_name")?.Value;
        var ownerUser = await _userManager.FindByNameAsync(ownerUsername);
        var ownerRoles = await _userManager.GetRolesAsync(ownerUser);

        if (ownerUser is null) return BadRequest("Token expired! Please relogin...");

        user.FirstName = data.FirstName;
        user.MiddleName = data.MiddleName;
        user.LastName = data.LastName;

        if (ownerUser.Email.ToLower() == user.Email!.ToLower())
        {
            await _userManager.UpdateAsync(user);
            return Ok(new { User = user, Roles = roles });
        }
        else
        {
            if (ownerRoles.Contains("Admin"))
            {
                await _userManager.UpdateAsync(user);
                return Ok(new { User = user, Roles = roles });
            }

            return Unauthorized();
        }
    }

    [HttpGet("users/approved")]
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    public async Task<IActionResult> FetchAllApprovedAsync()
    {
        var users = await _userManager.Users
            .Join(_dbContext.UserRoles, u => u.Id, r => r.UserId, (u, r) => new { User = u, Roles = r })
            .Join(_dbContext.Roles, ur => ur.Roles.RoleId, r => r.Id, (ur, r) => new { UserRoles = ur, Role = r })
            .Where(g => g.Role.Name != "Unassigned")
            .Select(c => new UserData
            {
                Email = c.UserRoles.User.Email,
                Username = c.UserRoles.User.UserName,
                FirstName = c.UserRoles.User.FirstName,
                MiddleName = c.UserRoles.User.MiddleName,
                LastName = c.UserRoles.User.LastName,
                Roles = new List<string> { c.Role.Name }
            })
            .ToListAsync();

        return Ok(users);
    }

    [HttpGet("users/unapproved")]
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    public async Task<IActionResult> FetchAllUnApprovedAsync()
    {
        var users = await _userManager.Users
            .Join(_dbContext.UserRoles, u => u.Id, r => r.UserId, (u, r) => new { User = u, Roles = r })
            .Join(_dbContext.Roles, ur => ur.Roles.RoleId, r => r.Id, (ur, r) => new { UserRoles = ur, Role = r })
            .Where(g => g.Role.Name == "Unassigned")
            .Select(c => new UserData
            {
                Email = c.UserRoles.User.Email,
                Username = c.UserRoles.User.UserName,
                FirstName = c.UserRoles.User.FirstName,
                MiddleName = c.UserRoles.User.MiddleName,
                LastName = c.UserRoles.User.LastName,
                Roles = new List<string> { c.Role.Name }
            })
            .ToListAsync();

        return Ok(users);
    }
}
