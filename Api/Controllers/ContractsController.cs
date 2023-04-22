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
public class ContractsController : ControllerBase
{

    private readonly ApplicationContext _dbContext;

    public ContractsController(ApplicationContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Create
    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] AddContractRequest request)
    {
        Contract newContract = new()
        {
            ClientId = request.ClientId,
            SeoId = request.SeoId,
            Type = request.Type,
            Plan = request.Plan,
            Status = request.Status,
            ManagedBy = request.ManagedBy,
            DateCreated = DateTime.UtcNow,
            DateUpdated = DateTime.UtcNow
        };

        await _dbContext.Contracts.AddAsync(newContract);
        await _dbContext.SaveChangesAsync();

        return Created("comments", newContract);
    }

    // Update
    [HttpPut("id/{id}")]
    public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] AddContractRequest addContractRequest)
    {
        Contract? existing = await _dbContext.Contracts
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        if (existing is null) return NotFound();

        existing.ClientId = addContractRequest.ClientId;
        existing.SeoId = addContractRequest.SeoId;
        existing.Type = addContractRequest.Type;
        existing.Status = addContractRequest.Status;
        existing.ManagedBy = addContractRequest.ManagedBy;
        existing.DateUpdated = DateTime.UtcNow;

        _dbContext.Contracts.Update(existing);
        await _dbContext.SaveChangesAsync();

        return Ok(existing);
    }

    // Delete 
    [HttpDelete("id/{id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] int id)
    {
        Contract? existing = await _dbContext.Contracts
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        if (existing is null) return NotFound();

        _dbContext.Remove(existing);
        await _dbContext.SaveChangesAsync();

        return Ok(existing);
    }

    // Read
    [HttpGet("client/{clientId}")]
    public async Task<IActionResult> FetchAsync([FromRoute] int clientId)
    {
        List<Contract> contracts = await _dbContext.Contracts
            .Where(c => c.ClientId == clientId)
            .OrderBy(c => c.DateCreated)
            .ToListAsync();

        return Ok(contracts);
    }
}
