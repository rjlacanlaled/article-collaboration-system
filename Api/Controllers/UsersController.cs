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

namespace Api.Controllers;

[ApiController]
[ApiVersion(1.0)]
[Route("api/v{versionNumber}/[controller]")]
[Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
public class UsersController : ControllerBase
{

    private readonly ApplicationContext _dbContext;

    public UsersController(ApplicationContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Create
    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] AddUsersRequest request)
    {
        User newUsers = new()
        {
            Username = request.Username,
            Password = request.Password,
            Email = request.Email,
        };

        await _dbContext.AUsers.AddAsync(newUsers);
        await _dbContext.SaveChangesAsync();

        return Created("User", newUsers);
    }

    // Update

    [HttpPut("id/{id}")]
    public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] AddUsersRequest addUsersRequest)
    {
        if (addUsersRequest is null) return BadRequest("Request body is null");

        User? existing = await _dbContext.AUsers
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        if (existing is null) return NotFound();

        existing.Username = addUsersRequest.Username;
        existing.Password = addUsersRequest.Password;
        existing.Email = addUsersRequest.Email;

        _dbContext.AUsers.Update(existing);
        await _dbContext.SaveChangesAsync();

        return Ok(existing);
    }

    // Read
    [HttpGet("username/{username}")]
    public async Task<IActionResult> FetchAsync([FromRoute] string username)
    {
        User? user = await _dbContext.AUsers
            .Where(c => c.Username == username)
            .FirstOrDefaultAsync();

        if (user is null) return NotFound();

        return Ok(user);
    }

    [HttpGet("users/approved")]
    public async Task<IActionResult> FetchAllApprovedAsync()
    {
        var users = await _dbContext.AUsers
            .Join(_dbContext.AUserRoles, u => u.Id, ur => ur.UserId, (u, ur) => new { User = u, UserRoles = ur })
            .Where(g => g.UserRoles != null)
            .Join(_dbContext.UserDetails, g => g.User.Id, ud => ud.UserId, (g, ud) => new { g.User, UserRole = g.UserRoles, UserDetail = ud })
            .Join(_dbContext.ARoles, g => g.UserRole.RoleId, r => r.Id, (g, r) => new { g.User, g.UserRole, g.UserDetail, UserRoleDetail = r })
            .Select(g => new UserDetailWithRole()
            {
                UserId = g.User.Id,
                FirstName = g.UserDetail.FirstName,
                LastName = g.UserDetail.LastName,
                Email = g.User.Email,
                Role = g.UserRoleDetail.Name,
                RegistrationDate = DateTime.UtcNow
            })
            .OrderBy(u => u.UserId)
            .ToListAsync();

        if (users is null || users.Count <= 0) return NotFound();

        return Ok(users);
    }

    [HttpGet("users/unapproved")]
    public async Task<IActionResult> FetchAllUnApprovedAsync()
    {

        var users = await _dbContext.AUsers
            .GroupJoin(_dbContext.AUserRoles, u => u.Id, ur => ur.UserId, (u, ur) => new { User = u, UserRoles = ur })
            .Where(g => !g.UserRoles.Any())
            .Join(_dbContext.UserDetails, g => g.User.Id, ud => ud.UserId, (g, ud) => new { g.User, UserRole = g.UserRoles, UserDetail = ud })
            .Select(g => new UserDetailWithRole()
            {
                UserId = g.User.Id,
                FirstName = g.UserDetail.FirstName,
                LastName = g.UserDetail.LastName,
                Email = g.User.Email,
                Role = null,
                RegistrationDate = DateTime.UtcNow
            })
            .ToListAsync();

        if (users is null || users.Count <= 0) return NotFound();

        return Ok(users);
    }

}
