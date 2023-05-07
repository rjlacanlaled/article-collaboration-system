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
public class RolesController : ControllerBase
{

    private readonly ApplicationContext _dbContext;

    public RolesController(ApplicationContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Create
    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] AddRolesRequest request)
    {
        Role newRoles = new()
        {
            Name = request.Name
        };

        await _dbContext.Roles.AddAsync(newRoles);
        await _dbContext.SaveChangesAsync();

        return Created("Role", newRoles);
    }

    // Update
    [HttpPut("id/{id}")]
    public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] AddRolesRequest addRolesRequest)
    {
        Role? existing = await _dbContext.Roles
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        if (existing is null) return NotFound();

        existing.Name = addRolesRequest.Name;

        _dbContext.Roles.Update(existing);
        await _dbContext.SaveChangesAsync();

        return Ok(existing);
    }

    // Delete 
    [HttpDelete("id/{id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] int id)
    {
        Role? existing = await _dbContext.Roles
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        if (existing is null) return NotFound();

        _dbContext.Remove(existing);
        await _dbContext.SaveChangesAsync();

        return Ok(existing);
    }

    // Read
    [HttpGet("role/{name}")]
    public async Task<IActionResult> FetchAsync([FromRoute] string name)
    {
        List<Role> Roles = await _dbContext.Roles
            .Where(c => c.Name == name)
            .ToListAsync();

        return Ok(Roles);
    }

    [HttpGet("all")]
    public async Task<IActionResult> FetchAllAsync()
    {
        List<Role> Roles = await _dbContext.Roles
            .OrderBy(r => r.Name)
            .ToListAsync();

        return Ok(Roles);
    }
}
