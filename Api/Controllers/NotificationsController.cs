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
public class NotificationsController : ControllerBase
{

    private readonly ApplicationContext _dbContext;

    public NotificationsController(ApplicationContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Create
    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] string message)
    {
        Notification newNotification = new()
        {
            Message = message
        };

        await _dbContext.Notifications.AddAsync(newNotification);
        await _dbContext.SaveChangesAsync();

        return Created("notifications", newNotification);
    }

    // Update
    [HttpPut("id/{id}")]
    public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] string message)
    {
        Notification? existing = await _dbContext.Notifications
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        if (existing is null) return NotFound();

        existing.Message = message;

        _dbContext.Notifications.Update(existing);
        await _dbContext.SaveChangesAsync();

        return Ok(existing);
    }

    // Delete 
    [HttpDelete("id/{id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] int id)
    {
        Notification? existing = await _dbContext.Notifications
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        if (existing is null) return NotFound();

        _dbContext.Remove(existing);
        await _dbContext.SaveChangesAsync();

        return Ok(existing);
    }

    // Read
    [HttpGet("id/{id}")]
    public async Task<IActionResult> FetchAsync([FromRoute] int id)
    {
        Notification? notification = await _dbContext.Notifications
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        return Ok(notification);
    }
}
