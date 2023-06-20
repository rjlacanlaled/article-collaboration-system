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
        Contract newContract = new()
        {
            ClientEmail = request.ClientEmail,
            SeoEmail = request.SeoEmail,
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

    [HttpGet("contract/email/{email}")]
    public async Task<IActionResult> FetchByEmailAsync([FromRoute] string email)
    {
        var result = await _dbContext.Contracts.Where(x => x.ClientEmail == email).ToListAsync();
        return Ok(result);
    }

    [HttpGet("contract/all")]
    public async Task<IActionResult> FetchAll()
    {
        var result = await _dbContext.Contracts.ToListAsync();
        return Ok(result);
    }
}
