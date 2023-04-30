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
public class UserDetailsController : ControllerBase
{

    private readonly ApplicationContext _dbContext;

    public UserDetailsController(ApplicationContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Create
    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] AddUserDetailsRequest request)
    {
        UserDetail newUserDetails = new()
        {
            UserId = request.UserId,
            FirstName = request.FirstName,
            MiddleName = request.MiddleName,
            LastName = request.LastName,
            Address = request.Address,
        };

        await _dbContext.UserDetails.AddAsync(newUserDetails);
        await _dbContext.SaveChangesAsync();

        return Created("User", newUserDetails);
    }

    // Update
    [HttpPut("id/{id}")]
    public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] AddUserDetailsRequest addUserDetailsRequest)
    {
        UserDetail? existing = await _dbContext.UserDetails
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        if (existing is null) return NotFound();

        existing.UserId = addUserDetailsRequest.UserId;
        existing.FirstName = addUserDetailsRequest.FirstName;
        existing.MiddleName = addUserDetailsRequest.MiddleName;
        existing.Address = addUserDetailsRequest.Address;

        _dbContext.UserDetails.Update(existing);
        await _dbContext.SaveChangesAsync();

        return Ok(existing);
    }

    // Delete 
    [HttpDelete("id/{id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] int id)
    {
        UserDetail? existing = await _dbContext.UserDetails
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        if (existing is null) return NotFound();

        _dbContext.Remove(existing);
        await _dbContext.SaveChangesAsync();

        return Ok(existing);
    }

    // Read
    [HttpGet("user/{userId}")]
    public async Task<IActionResult> FetchAsync([FromRoute] int userId)
    {
        List<UserDetail> UserDetails = await _dbContext.UserDetails
            .Where(c => c.UserId == userId)
            .ToListAsync();

        return Ok(UserDetails);
    }
}
