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
public class ProjectTasksController : ControllerBase
{

    private readonly ApplicationContext _dbContext;

    public ProjectTasksController(ApplicationContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Create
    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] AddProjectTaskRequest request)
    {

        ProjectTask newProjectTask = new()
        {
            Title = request.Title,
            Description = request.Description,
            Status = request.Status,
            Type = request.Type,
            Words = request.Words,
            Timeliness = request.Timeliness,
            ContractId = request.ContractId,
            DateCreated = DateTime.UtcNow,
            DateUpdated = DateTime.UtcNow
        };

        await _dbContext.ProjectTasks.AddAsync(newProjectTask);
        await _dbContext.SaveChangesAsync();

        return Created("projectTask", newProjectTask);
    }

    // Update
    [HttpPut("id/{id}")]
    public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] AddProjectTaskRequest request)
    {
        ProjectTask? existing = await _dbContext.ProjectTasks
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        if (existing is null) return NotFound();

        existing.Title = request.Title;
        existing.Description = request.Description;
        existing.Status = request.Status;
        existing.Type = request.Type;
        existing.Words = request.Words;
        existing.Timeliness = request.Timeliness;
        existing.ContractId = request.ContractId;
        existing.DateUpdated = DateTime.UtcNow;

        _dbContext.ProjectTasks.Update(existing);
        await _dbContext.SaveChangesAsync();

        return Ok(existing);
    }

    // Delete 
    [HttpDelete("id/{id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] int id)
    {
        ProjectTask? existing = await _dbContext.ProjectTasks
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        if (existing is null) return NotFound();

        _dbContext.ProjectTasks.Remove(existing);
        await _dbContext.SaveChangesAsync();

        return Ok(existing);
    }

    // Read
    [HttpGet("user/{userId}")]
    public async Task<IActionResult> FetchAsync([FromRoute] int userId)
    {
        List<ProjectTask> tasks = await _dbContext.ProjectTasks
            .OrderBy(c => c.DateUpdated)
            .ToListAsync();

        return Ok(tasks);
    }
}
