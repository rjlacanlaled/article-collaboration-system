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
[Authorize(AuthenticationSchemes = "Bearer", Roles = "Client, SeoManager, SeoSpecialist, ContentManager, ContentWriter, TopManagement, WebDeveloper")]
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
        ProjectTaskAssignee? existingAssignee = await _dbContext.ProjectTaskAssignees
            .Where(x => x.ProjectTaskId == request.ProjectTaskId)
            .Where(x => x.RoleName == request.RoleName)
            .FirstOrDefaultAsync();

        if (existingAssignee is not null)
        {
            _dbContext.ProjectTaskAssignees.Remove(existingAssignee);
        }

        ProjectTaskAssignee newProjectTaskAssignee = new()
        {
            // public int ProjectTaskId { get; init; }
            // public int UserId { get; init; }
            // public int RoleId { get; init; }
            ProjectTaskId = request.ProjectTaskId,
            UserEmail = request.UserEmail,
            RoleName = request.RoleName
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
        existing.UserEmail = request.UserEmail;
        existing.RoleName = request.RoleName;

        _dbContext.ProjectTaskAssignees.Update(existing);
        await _dbContext.SaveChangesAsync();

        return Ok(existing);
    }

    // Delete 
    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteAsync([FromBody] AddProjectTaskAssigneeRequest request)
    {
        ProjectTaskAssignee? existing = await _dbContext.ProjectTaskAssignees
            .Where(x => x.ProjectTaskId == request.ProjectTaskId)
            .Where(x => x.RoleName == request.RoleName)
            .FirstOrDefaultAsync();

        if (existing is null) return NotFound();

        _dbContext.ProjectTaskAssignees.Remove(existing);
        await _dbContext.SaveChangesAsync();

        return Ok(existing);
    }

    [HttpDelete("delete/task/{taskId}/role/{roleName}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] int taskId, string roleName)
    {
        List<ProjectTaskAssignee>? existing = await _dbContext.ProjectTaskAssignees
            .Where(x => x.ProjectTaskId == taskId)
            .Where(x => x.RoleName == roleName)
            .ToListAsync();

        if (existing is null) return NotFound();

        _dbContext.ProjectTaskAssignees.RemoveRange(existing);
        await _dbContext.SaveChangesAsync();

        return Ok(existing);
    }

    // Read
    [HttpGet("user/{userId}")]
    public async Task<IActionResult> FetchAsync([FromRoute] string userId)
    {
        List<ProjectTaskAssignee> tasks = await _dbContext.ProjectTaskAssignees
            .Where(c => c.UserEmail == userId)
            .OrderBy(c => c.ProjectTaskId)
            .ToListAsync();

        return Ok(tasks);
    }

    [HttpGet("assignees/{taskId}")]
    public async Task<IActionResult> FetchAssigneesAsync([FromRoute] int taskId)
    {
        List<ProjectTaskAssignee> tasks = await _dbContext.ProjectTaskAssignees
            .Where(c => c.ProjectTaskId == taskId)
            .ToListAsync();

        return Ok(tasks);
    }
}
