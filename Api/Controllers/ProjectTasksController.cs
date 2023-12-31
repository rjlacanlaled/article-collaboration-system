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
using Common.Models.Enums;
using Api.Services;
using Common.Models.Mail;

namespace Api.Controllers;

[ApiController]
[ApiVersion(1.0)]
[Route("api/v{versionNumber}/[controller]")]
[Authorize(AuthenticationSchemes = "Bearer", Roles = "Client, SeoManager, SeoSpecialist, ContentManager, ContentWriter, TopManagement, WebDeveloper")]
public class ProjectTasksController : ControllerBase
{

    private readonly ApplicationContext _dbContext;
    private readonly IMailService _mailService;

    public ProjectTasksController(ApplicationContext dbContext, IMailService mailService)
    {
        _dbContext = dbContext;
        _mailService = mailService;
    }

    // Create
    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] AddProjectTaskRequest request)
    {

        ProjectTask newProjectTask = new()
        {
            Title = request.Title,
            Description = request.Description,
            Link = request.Link,
            Status = request.Status,
            Type = request.Type,
            Words = request.Words,
            Timeliness = request.Timeliness,
            ContractId = request.ContractId,
            SeoDeadline = request.SeoDeadline,
            ProductionDate = request.ProductionDate,
            DateCreated = DateTime.UtcNow,
            DateUpdated = DateTime.UtcNow
        };

        await _dbContext.ProjectTasks.AddAsync(newProjectTask);
        await _dbContext.SaveChangesAsync();

        return Ok(newProjectTask);
    }

    // Update
    [HttpPut("id/{id}")]
    public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] AddProjectTaskRequest request)
    {
        ProjectTask? existing = await _dbContext.ProjectTasks
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        Console.WriteLine(existing);

        if (existing is null) return NotFound();

        bool statusChanged = existing.Status != request.Status;

        existing.Title = request.Title;
        existing.Description = request.Description;
        existing.Link = request.Link;
        existing.Status = request.Status;
        existing.Type = request.Type;
        existing.Words = request.Words;
        existing.Timeliness = request.Timeliness;
        existing.ContractId = request.ContractId;
        existing.DateUpdated = DateTime.UtcNow;
        existing.SeoDeadline = request.SeoDeadline;
        existing.ProductionDate = request.ProductionDate;
        existing.Link = request.Link;

        _dbContext.ProjectTasks.Update(existing);
        await _dbContext.SaveChangesAsync();

        var assignees = await _dbContext.ProjectTaskAssignees.Where(x => x.ProjectTaskId == id).ToListAsync();

        if (statusChanged && (request.Status == ProjectTaskStatus.ForReview || request.Status == ProjectTaskStatus.Completed))
        {
            MailRequest? mailRequest = null;
            List<string>? assigneeEmails = null;

            switch (request.Status)
            {

                case ProjectTaskStatus.ForReview:
                    assigneeEmails = assignees.Where(a => a.RoleName != "Client").Select(a => a.UserEmail).ToList();
                    mailRequest = new()
                    {
                        ToEmail = assigneeEmails,
                        Subject = $@"Task Ready for Review: {request.Title}",
                        Body = $@"
The following task is now ready for review:

Task Title: {request.Title}
Description: {request.Description}

https://searchworks.xyz/viewtask/{id}

Best regards,
Searchworks
"
                    };
                    await _mailService.SendEmailAsync(mailRequest);
                    break;
                case ProjectTaskStatus.Completed:

                    assigneeEmails = assignees.Where(a => a.RoleName != "Client").Select(a => a.UserEmail).ToList();
                    mailRequest = new()
                    {
                        ToEmail = assigneeEmails,
                        Subject = $@"Task Completed: {request.Title}",
                        Body = $@"
The following task is now completed:

Task Title: {request.Title}
Description: {request.Description}

https://searchworks.xyz/viewtask/{id}

Best regards,
Searchworks
"
                    };
                    await _mailService.SendEmailAsync(mailRequest);
                    break;

            }



        }
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
    public async Task<IActionResult> FetchAsync([FromRoute] string userId)
    {
        // @TODO: join with project assignees
        List<ProjectTaskAssigneeDetails> tasks = await _dbContext.ProjectTasks
            .Join(_dbContext.ProjectTaskAssignees.Where(pta => pta.UserEmail == userId), pt => pt.Id, pta => pta.ProjectTaskId, (pt, pta) => new { ProjectTask = pt, Assignee = pta })
            .OrderBy(g => g.ProjectTask.DateUpdated)
            .Select(g => new ProjectTaskAssigneeDetails()
            {
                ProjectTask = g.ProjectTask,
                ProjectTaskAssignee = g.Assignee ?? new ProjectTaskAssignee()
            })
            .ToListAsync();

        return Ok(tasks);
    }

    [HttpGet("task/{taskId}")]
    public async Task<IActionResult> FetchTaskAsync([FromRoute] int taskId)
    {
        ProjectTaskDetails? task = await _dbContext.ProjectTasks
            .Where(pt => pt.Id == taskId)
            .GroupJoin(_dbContext.ProjectTaskAssignees, pt => pt.Id, pta => pta.ProjectTaskId, (pt, pta) => new { ProjectTask = pt, Assignee = pta })
            .Select(g => new ProjectTaskDetails()
            {
                Id = g.ProjectTask.Id,
                Title = g.ProjectTask.Title,
                Description = g.ProjectTask.Description,
                Link = g.ProjectTask.Link,
                Status = g.ProjectTask.Status,
                Type = g.ProjectTask.Type,
                Words = g.ProjectTask.Words,
                Timeliness = g.ProjectTask.Timeliness,
                ContractId = g.ProjectTask.ContractId,
                DateCreate = g.ProjectTask.DateCreated,
                DateUpdated = g.ProjectTask.DateUpdated,
                SeoDeadline = g.ProjectTask.SeoDeadline,
                ProductionDeadline = g.ProjectTask.ProductionDate,
                Assignees = g.Assignee.Select(a => new ProjectAssigneeRole()
                {
                    UserId = a.UserEmail,
                    FirstName = "",
                    LastName = "",
                    RoleId = a.RoleName,
                    Role = ""
                })
                .ToList()
            })
            .FirstOrDefaultAsync();

        return Ok(task);
    }

    [HttpGet("all")]
    public async Task<IActionResult> FetchAllAsync()
    {
        var tasks = await _dbContext.ProjectTasks
            .OrderBy(c => c.DateUpdated)
            .GroupJoin(_dbContext.ProjectTaskAssignees, pt => pt.Id, pta => pta.ProjectTaskId, (pt, pta) => new { ProjectTask = pt, Assignee = pta })
            .Select(g => new ProjectTaskDetails()
            {
                Id = g.ProjectTask.Id,
                Title = g.ProjectTask.Title,
                Description = g.ProjectTask.Description,
                Link = g.ProjectTask.Link,
                Status = g.ProjectTask.Status,
                Type = g.ProjectTask.Type,
                Words = g.ProjectTask.Words,
                Timeliness = g.ProjectTask.Timeliness,
                ContractId = g.ProjectTask.ContractId,
                DateCreate = g.ProjectTask.DateCreated,
                DateUpdated = g.ProjectTask.DateUpdated,
                SeoDeadline = g.ProjectTask.SeoDeadline,
                ProductionDeadline = g.ProjectTask.ProductionDate,
                Assignees = g.Assignee.Select(a => new ProjectAssigneeRole()
                {
                    UserId = a.UserEmail,
                    FirstName = "",
                    LastName = "",
                    RoleId = a.RoleName,
                    Role = ""
                })
                .ToList()
            })
            .ToListAsync();

        return Ok(tasks);
    }

    [HttpPost("done")]
    public async Task<IActionResult> ClearDoneAsync([FromBody] List<int> taskIds)
    {
        var tasks = await _dbContext.ProjectTasks.Where(x => taskIds.Contains(x.Id)).ToListAsync();

        foreach (var task in tasks)
        {
            task.Status = ProjectTaskStatus.Done;
            task.DateUpdated = DateTime.UtcNow;
        }

        _dbContext.ProjectTasks.UpdateRange(tasks);
        await _dbContext.SaveChangesAsync();

        return Ok();
    }

    [HttpGet("done")]
    public async Task<IActionResult> GetDone()
    {
        var doneTasks = await _dbContext.ProjectTasks
            .Where(x => x.Status == ProjectTaskStatus.Done)
            .OrderByDescending(x => x.DateUpdated)
            .GroupJoin(_dbContext.ProjectTaskAssignees, pt => pt.Id, pta => pta.ProjectTaskId, (pt, pta) => new { ProjectTask = pt, Assignee = pta })
            .Select(g => new ProjectTaskDetails()
            {
                Id = g.ProjectTask.Id,
                Title = g.ProjectTask.Title,
                Description = g.ProjectTask.Description,
                Link = g.ProjectTask.Link,
                Status = g.ProjectTask.Status,
                Type = g.ProjectTask.Type,
                Words = g.ProjectTask.Words,
                Timeliness = g.ProjectTask.Timeliness,
                ContractId = g.ProjectTask.ContractId,
                DateCreate = g.ProjectTask.DateCreated,
                DateUpdated = g.ProjectTask.DateUpdated,
                SeoDeadline = g.ProjectTask.SeoDeadline,
                ProductionDeadline = g.ProjectTask.ProductionDate,
                Assignees = g.Assignee.Select(a => new ProjectAssigneeRole()
                {
                    UserId = a.UserEmail,
                    FirstName = "",
                    LastName = "",
                    RoleId = a.RoleName,
                    Role = ""
                })
                .ToList()
            })
            .ToListAsync();
        return Ok(doneTasks);
    }

    // [HttpGet("stats")]
    // public async Task<IActionResult> GetStats()
    // {
    //     var tasks = await _dbContext.ProjectTasks
    //         .OrderBy(c => c.DateUpdated)
    //         .GroupJoin(_dbContext.ProjectTaskAssignees, pt => pt.Id, pta => pta.ProjectTaskId, (pt, pta) => new { ProjectTask = pt, Assignee = pta })
    //         .Select(g => new ProjectTaskDetails()
    //         {
    //             Id = g.ProjectTask.Id,
    //             Title = g.ProjectTask.Title,
    //             Description = g.ProjectTask.Description,
    //             Link = g.ProjectTask.Link,
    //             Status = g.ProjectTask.Status,
    //             Type = g.ProjectTask.Type,
    //             Words = g.ProjectTask.Words,
    //             Timeliness = g.ProjectTask.Timeliness,
    //             ContractId = g.ProjectTask.ContractId,
    //             DateCreate = g.ProjectTask.DateCreated,
    //             DateUpdated = g.ProjectTask.DateUpdated,
    //             SeoDeadline = g.ProjectTask.SeoDeadline,
    //             ProductionDeadline = g.ProjectTask.ProductionDate,
    //             Assignees = g.Assignee.Select(a => new ProjectAssigneeRole()
    //             {
    //                 UserId = a.UserEmail,
    //                 FirstName = "",
    //                 LastName = "",
    //                 RoleId = a.RoleName,
    //                 Role = ""
    //             })
    //             .ToList()
    //         })
    //         .ToListAsync();

    //         return Ok();
    // }
}
