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
public class ContractPaymentsController : ControllerBase
{

    private readonly ApplicationContext _dbContext;

    public ContractPaymentsController(ApplicationContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Create
    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] AddContractPaymentRequest request)
    {
        ContractPayment newContractPayment = new()
        {
            ContractId = request.ContractId,
            Link = request.Link,
            Amount = request.Amount,
            ClientId = request.ClientId,
            PaymentDate = DateTime.UtcNow
        };

        await _dbContext.ContractPayments.AddAsync(newContractPayment);
        await _dbContext.SaveChangesAsync();

        return Created("comments", newContractPayment);
    }

    // Update
    [HttpPut("id/{id}")]
    public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] AddContractPaymentRequest req)
    {
        ContractPayment? existing = await _dbContext.ContractPayments
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        if (existing is null) return NotFound();

        existing.ContractId = req.ContractId;
        existing.Link = req.Link;
        existing.Amount = req.Amount;
        existing.PaymentDate = DateTime.UtcNow;

        _dbContext.ContractPayments.Update(existing);
        await _dbContext.SaveChangesAsync();

        return Ok(existing);
    }

    // Delete 
    [HttpDelete("id/{id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] int id)
    {
        ContractPayment? existing = await _dbContext.ContractPayments
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        if (existing is null) return NotFound();

        _dbContext.ContractPayments.Remove(existing);
        await _dbContext.SaveChangesAsync();

        return Ok(existing);
    }

    // Read
    [HttpGet("client/{clientId}")]
    public async Task<IActionResult> FetchAsync([FromRoute] int clientId)
    {
        List<ContractPayment> contractPayments = await _dbContext.ContractPayments
            .Where(c => c.ClientId == clientId)
            .OrderBy(c => c.PaymentDate)
            .ToListAsync();

        return Ok(contractPayments);
    }

    [HttpGet("all")]
    public async Task<IActionResult> FetchAllAsync()
    {
        var contractPayments = await _dbContext.ContractPayments
            .Join(_dbContext.Contracts, cp => cp.ContractId, c => c.Id, (cp, c) => new { ContractPayment = cp, Contract = c })
            .Where(g => g.Contract != null)
            .Join(_dbContext.UserDetails, g => g.Contract.ClientId, ud => ud.Id, (g, ud) => new { g.ContractPayment, g.Contract, UserDetails = ud })
            .OrderBy(g => g.ContractPayment.PaymentDate)
            .ToListAsync();

        return Ok(contractPayments);
    }
}
