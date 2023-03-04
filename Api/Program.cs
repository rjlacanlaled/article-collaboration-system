using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(options =>
           {
               options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
               options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
           })
           .AddJwtBearer(options =>
           {
               options.Authority = "https://accounts.google.com";
               options.Audience = "<your-client-id>";
           })
           .AddGoogle(options =>
           {
               options.ClientId = builder.Configuration["Authentication:Google:ClientId"] ?? "";
               options.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"] ?? "";
               options.SignInScheme = JwtBearerDefaults.AuthenticationScheme;
           });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
