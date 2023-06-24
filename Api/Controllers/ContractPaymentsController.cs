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
public class ContractPaymentsController : ControllerBase
{

    private readonly ApplicationContext _dbContext;

    public ContractPaymentsController(ApplicationContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Create
    // [HttpPost]
    // public async Task<IActionResult> AddAsync([FromBody] AddContractPaymentRequest request)
    // {
    //     ContractPayment newContractPayment = new()
    //     {
    //         ContractId = request.ContractId,
    //         Link = request.Link,
    //         Amount = request.Amount,
    //         ClientId = request.ClientId,
    //         PaymentDate = DateTime.UtcNow
    //     };

    //     await _dbContext.ContractPayments.AddAsync(newContractPayment);
    //     await _dbContext.SaveChangesAsync();

    //     return Created("comments", newContractPayment);
    // }

    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] AddContractPaymentRequest request)
    {
        ContractPayment newContractPayment = new()
        {
            ContractId = request.ContractId,
            Link = request.Link,
            Amount = request.Amount,
            ClientEmail = request.ClientEmail,
            PaymentDate = DateTime.UtcNow
        };

        await _dbContext.ContractPayments.AddAsync(newContractPayment);
        await _dbContext.SaveChangesAsync();

        return Created("comments", newContractPayment);
    }

    // // Update
    // [HttpPut("id/{id}")]
    // public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] AddContractPaymentRequest req)
    // {
    //     ContractPayment? existing = await _dbContext.ContractPayments
    //         .Where(c => c.Id == id)
    //         .FirstOrDefaultAsync();

    //     if (existing is null) return NotFound();

    //     existing.ContractId = req.ContractId;
    //     existing.Link = req.Link;
    //     existing.Amount = req.Amount;
    //     existing.PaymentDate = DateTime.UtcNow;

    //     _dbContext.ContractPayments.Update(existing);
    //     await _dbContext.SaveChangesAsync();

    //     return Ok(existing);
    // }

    // // Delete 
    // [HttpDelete("id/{id}")]
    // public async Task<IActionResult> DeleteAsync([FromRoute] int id)
    // {
    //     ContractPayment? existing = await _dbContext.ContractPayments
    //         .Where(c => c.Id == id)
    //         .FirstOrDefaultAsync();

    //     if (existing is null) return NotFound();

    //     _dbContext.ContractPayments.Remove(existing);
    //     await _dbContext.SaveChangesAsync();

    //     return Ok(existing);
    // }

    // // Read
    [HttpGet("client/{clientEmail}")]
    public async Task<IActionResult> FetchAsync([FromRoute] string clientEmail)
    {
        List<ContractPayment> contractPayments = await _dbContext.ContractPayments
            .Where(c => c.ClientEmail == clientEmail)
            .OrderBy(c => c.PaymentDate)
            .ToListAsync();

        return Ok(contractPayments);
    }

    [HttpGet("all")]
    public async Task<IActionResult> FetchAllAsync()
    {
        List<ContractPayment> contractPayments = await _dbContext.ContractPayments
            .OrderBy(c => c.PaymentDate)
            .ToListAsync();

        return Ok(contractPayments);
    }
}
