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

        await _dbContext.Users.AddAsync(newUsers);
        await _dbContext.SaveChangesAsync();

        return Created("User", newUsers);
    }

    // Update

    [HttpPut("id/{id}")]
    public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] AddUsersRequest addUsersRequest)
    {
        if (addUsersRequest is null) return BadRequest("Request body is null");
    
        User? existing = await _dbContext.Users
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();
    
        if (existing is null) return NotFound();
    
        existing.Username = addUsersRequest.Username;
        existing.Password = addUsersRequest.Password;
        existing.Email = addUsersRequest.Email;
    
        _dbContext.Users.Update(existing);
        await _dbContext.SaveChangesAsync();
    
        return Ok(existing);
    }

    // Read
    [HttpGet("username/{username}")]
    public async Task<IActionResult> FetchAsync([FromRoute] string username)
    {
        User user = await _dbContext.Users
            .Where(c => c.Username == username)
            .FirstOrDefaultAsync();

        if (user is null) return NotFound();

        return Ok(user);
    }
}
