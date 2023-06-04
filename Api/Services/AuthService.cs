using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Common.Models.Core;
using Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace Api.Services;

public class AuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IConfiguration _config;


    public AuthService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration config)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _config = config;
    }

    public async Task<(int, string)> Register(Registration registration, string role)
    {
        var userExist = await _userManager.FindByEmailAsync(registration.Email);
        if (userExist is not null) return (0, "UserAlreadyExist");

        ApplicationUser user = new()
        {
            Email = registration.Email,
            UserName = registration.Username,
            FirstName = registration.FirstName,
            MiddleName = registration.MiddleName,
            LastName = registration.LastName
        };

        var createUserResult = await _userManager.CreateAsync(user, registration.Password);

        if (!createUserResult.Succeeded) return (0, "UserCreationFailed: Please check the details and try again!");

        if (!await _roleManager.RoleExistsAsync(role)) await _roleManager.CreateAsync(new IdentityRole(role));

        if (await _roleManager.RoleExistsAsync(role)) await _userManager.AddToRoleAsync(user, role);

        return (1, "UserCreatedSuccessfully");
    }

    public async Task<(int, string)> Login(Login login)
    {
        var user = await _userManager.FindByEmailAsync(login.Email);

        if (user is null) return (0, "Email does not exist!");
        if (!await _userManager.CheckPasswordAsync(user, login.Password)) return (0, "InvalidPassword");

        var userRoles = await _userManager.GetRolesAsync(user);

        List<Claim> authClaims = new()
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        foreach (var userRole in userRoles)
        {
            authClaims.Add(new Claim(ClaimTypes.Role, userRole));
        }

        string token = GenerateToken(authClaims);
        return (1, token);
    }

    private string GenerateToken(IEnumerable<Claim> claims)
    {
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Key"]));
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Issuer = _config["JwtSettings:Issuer"],
            Audience = _config["JwtSettings:Audience"],
            Expires = DateTime.UtcNow.AddMinutes(43829),
            SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256),
            Subject = new ClaimsIdentity(claims)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}