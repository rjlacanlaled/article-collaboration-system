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
[Authorize(AuthenticationSchemes = "Bearer", Roles = "Client, SeoManager, SeoSpecialist, ContentManager, ContentWriter, TopManagement, WebDeveloper, Admin, Web Developer")]
public class NotificationAssigneesController : ControllerBase
{

    private readonly ApplicationContext _dbContext;

    public NotificationAssigneesController(ApplicationContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Create
    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] AddNotificationAssigneeRequest request)
    {
        NotificationAssignee newNotificationAssignee = new()
        {
            NotificationId = request.NotificationId,
            UserId = request.UserId,
            Seen = request.Seen,
            EmailSent = request.EmailSent,
            DateSent = DateTime.UtcNow
        };

        await _dbContext.NotificationAssignees.AddAsync(newNotificationAssignee);
        await _dbContext.SaveChangesAsync();

        return Created("comments", newNotificationAssignee);
    }

    // Update
    [HttpPut("id/{id}")]
    public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] AddNotificationAssigneeRequest request)
    {
        NotificationAssignee? existing = await _dbContext.NotificationAssignees
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        if (existing is null) return NotFound();

        existing.NotificationId = request.NotificationId;
        existing.UserId = request.UserId;
        existing.Seen = request.Seen;
        existing.EmailSent = request.EmailSent;

        _dbContext.NotificationAssignees.Update(existing);
        await _dbContext.SaveChangesAsync();

        return Ok(existing);
    }

    // Delete 
    [HttpDelete("id/{id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] int id)
    {
        NotificationAssignee? existing = await _dbContext.NotificationAssignees
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        if (existing is null) return NotFound();

        _dbContext.NotificationAssignees.Remove(existing);
        await _dbContext.SaveChangesAsync();

        return Ok(existing);
    }

    // Read
    [HttpGet("user/{userId}")]
    public async Task<IActionResult> FetchAsync([FromRoute] int userId)
    {
        List<NotificationAssignee> notificationAssignees = await _dbContext.NotificationAssignees
            .Where(c => c.UserId == userId)
            .OrderBy(c => c.DateSent)
            .ToListAsync();

        return Ok(notificationAssignees);
    }
}
