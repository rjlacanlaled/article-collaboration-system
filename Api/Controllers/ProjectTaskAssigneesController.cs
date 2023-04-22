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
public class ProjectTaskAssigneesController : ControllerBase
{

    private readonly ApplicationContext _dbContext;

    public ProjectTaskAssigneesController(ApplicationContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Create
    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] AddProjectTaskAssigneeRequest request)
    {

        ProjectTaskAssignee newProjectTaskAssignee = new()
        {
            // public int ProjectTaskId { get; init; }
            // public int UserId { get; init; }
            // public int RoleId { get; init; }
            ProjectTaskId = request.ProjectTaskId,
            UserId = request.UserId,
            RoleId = request.RoleId
        };

        await _dbContext.ProjectTaskAssignees.AddAsync(newProjectTaskAssignee);
        await _dbContext.SaveChangesAsync();

        return Created("projectTaskAssignee", newProjectTaskAssignee);
    }

    // Update
    [HttpPut("id/{id}")]
    public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] AddProjectTaskAssigneeRequest request)
    {
        ProjectTaskAssignee? existing = await _dbContext.ProjectTaskAssignees
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        if (existing is null) return NotFound();

        existing.ProjectTaskId = request.ProjectTaskId;
        existing.UserId = request.UserId;
        existing.RoleId = request.RoleId;

        _dbContext.ProjectTaskAssignees.Update(existing);
        await _dbContext.SaveChangesAsync();

        return Ok(existing);
    }

    // Delete 
    [HttpDelete("id/{id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] int id)
    {
        ProjectTaskAssignee? existing = await _dbContext.ProjectTaskAssignees
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        if (existing is null) return NotFound();

        _dbContext.ProjectTaskAssignees.Remove(existing);
        await _dbContext.SaveChangesAsync();

        return Ok(existing);
    }

    // Read
    [HttpGet("user/{userId}")]
    public async Task<IActionResult> FetchAsync([FromRoute] int userId)
    {
        List<ProjectTaskAssignee> tasks = await _dbContext.ProjectTaskAssignees
            .Where(c => c.UserId == userId)
            .OrderBy(c => c.ProjectTaskId)
            .ToListAsync();

        return Ok(tasks);
    }
}
