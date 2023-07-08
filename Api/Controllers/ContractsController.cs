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
public class ContractsController : ControllerBase
{

    private readonly ApplicationContext _dbContext;

    public ContractsController(ApplicationContext dbContext)
    {
        _dbContext = dbContext;
    }


    [HttpPost]
    public async Task<IActionResult> AddByEmailAsync([FromBody] AddContractRequest request)
    {
        Contract? existingContract = await _dbContext.Contracts.Where(x => x.ClientEmail == request.ClientEmail).FirstOrDefaultAsync();

        if (existingContract is not null)
        {
            return BadRequest("Contract already exist!");
        }

        Contract newContract = new()
        {
            ClientEmail = request.ClientEmail,
            SeoEmail = request.SeoEmail,
            Type = request.Type,
            Plan = request.Plan,
            PaymentStatus = request.Status,
            ManagedBy = request.ManagedBy,
            PaymentAmount = request.PaymentAmount,
            PaymentDate = request.PaymentDate,
            DateCreated = DateTime.UtcNow,
            DateUpdated = DateTime.UtcNow
        };

        await _dbContext.Contracts.AddAsync(newContract);
        await _dbContext.SaveChangesAsync();

        return Created("contract", newContract);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateContract([FromBody] AddContractRequest request)
    {
        Contract? existingContract = await _dbContext.Contracts.Where(x => x.ClientEmail == request.ClientEmail).FirstOrDefaultAsync();

        if (existingContract is null)
        {
            return BadRequest("Contract does not exist!");
        }

        existingContract.ClientEmail = request.ClientEmail;
        existingContract.SeoEmail = request.SeoEmail;
        existingContract.Type = request.Type;
        existingContract.Plan = request.Plan;
        existingContract.PaymentStatus = request.Status;
        existingContract.ManagedBy = request.ManagedBy;
        existingContract.PaymentAmount = request.PaymentAmount;
        existingContract.PaymentDate = request.PaymentDate;
        existingContract.DateUpdated = DateTime.UtcNow;


        _dbContext.Contracts.Update(existingContract);
        await _dbContext.SaveChangesAsync();
        return Ok(existingContract);
    }

    [HttpGet("contract/email/{email}")]
    public async Task<IActionResult> FetchByEmailAsync([FromRoute] string email)
    {
        var result = await _dbContext.Contracts.Where(x => x.ClientEmail == email).FirstOrDefaultAsync();
        return Ok(result);
    }

    [HttpGet("contract/all")]
    public async Task<IActionResult> FetchAll()
    {
        var result = await _dbContext.Contracts.ToListAsync();
        return Ok(result);
    }

    [HttpDelete("contract/email/{email}")]
    public async Task<IActionResult> DeleteByClientEmail([FromRoute] string email)
    {
        Contract? existingContract = await _dbContext.Contracts.Where(x => x.ClientEmail == email).FirstOrDefaultAsync();

        if (existingContract is null)
        {
            return BadRequest("Client not found!");
        }

        _dbContext.Remove(existingContract);

        List<ProjectTaskAssignee>? clientAssignees = await _dbContext.ProjectTaskAssignees.Where(pta => pta.UserEmail == email).ToListAsync();

        if (clientAssignees is not null)
        {
            _dbContext.Remove(clientAssignees);
        }

        await _dbContext.SaveChangesAsync();


        return Ok("Successfully deleted!");
    }
}
