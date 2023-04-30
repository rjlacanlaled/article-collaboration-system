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

namespace Api.Controllers;

[ApiController]
[ApiVersion(1.0)]
[Route("api/v{versionNumber}/[controller]")]
public class UserRolesController : ControllerBase
{

    private readonly ApplicationContext _dbContext;

    public UserRolesController(ApplicationContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Create
    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] AddUserRolesRequest request)
    {
        UserRole newUserRoles = new()
        {
            UserId = request.UserId,
            RoleId = request.RoleId
        };

        await _dbContext.UserRoles.AddAsync(newUserRoles);
        await _dbContext.SaveChangesAsync();

        return Created("UserRole", newUserRoles);
    }

    // Update
    [HttpPut("id/{id}")]
    public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] AddUserRolesRequest addUserRolesRequest)
    {
        UserRole? existing = await _dbContext.UserRoles
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        if (existing is null) return NotFound();

        existing.UserId = addUserRolesRequest.UserId;

        _dbContext.UserRoles.Update(existing);
        await _dbContext.SaveChangesAsync();

        return Ok(existing);
    }

    // Delete 
    [HttpDelete("id/{id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] int id)
    {
        UserRole? existing = await _dbContext.UserRoles
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        if (existing is null) return NotFound();

        _dbContext.Remove(existing);
        await _dbContext.SaveChangesAsync();

        return Ok(existing);
    }

    // Read
    [HttpGet("userrole/{userroleId}")]
    public async Task<IActionResult> FetchAsync([FromRoute] int userroleId)
    {
        List<UserRole> UserRoles = await _dbContext.UserRoles
            .Where(c => c.UserId == userroleId)
            .ToListAsync();

        return Ok(UserRoles);
    }
}
