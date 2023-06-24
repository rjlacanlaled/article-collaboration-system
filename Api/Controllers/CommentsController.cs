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
[Authorize(AuthenticationSchemes = "Bearer", Roles = "Client, SeoManager, SeoSpecialist, ContentManager, ContentWriter, TopManagement, WebDeveloper, Admin")]
public class CommentsController : ControllerBase
{

    private readonly ApplicationContext _dbContext;

    public CommentsController(ApplicationContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Create
    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] AddCommentRequest request)
    {
        Comment newComment = new()
        {
            TaskId = request.TaskId,
            UserId = request.UserId,
            Message = request.Message,
            DateCreated = DateTime.UtcNow,
            DateUpdated = DateTime.UtcNow
        };

        await _dbContext.Comments.AddAsync(newComment);
        await _dbContext.SaveChangesAsync();

        return Created("comments", newComment);
    }

    // Update
    [HttpPut("id/{id}")]
    public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] string message)
    {
        Comment? existingComment = await _dbContext.Comments
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        if (existingComment is null) return NotFound();

        existingComment.Message = message;
        existingComment.DateUpdated = DateTime.UtcNow;

        _dbContext.Comments.Update(existingComment);
        await _dbContext.SaveChangesAsync();

        return Ok(existingComment);
    }

    // Delete 
    [HttpDelete("id/{id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] int id)
    {
        Comment? existingComment = await _dbContext.Comments
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        if (existingComment is null) return NotFound();

        _dbContext.Remove(existingComment);
        await _dbContext.SaveChangesAsync();

        return Ok();
    }

    // Read
    [HttpGet("task/{taskId}")]
    public async Task<IActionResult> FetchAsync([FromRoute] int taskId)
    {
        List<Comment> comments = await _dbContext.Comments
            .Where(c => c.TaskId == taskId)
            .OrderBy(c => c.DateCreated)
            .ToListAsync();

        return Ok(comments);
    }
}
