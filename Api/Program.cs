using Microsoft.AspNetCore.Identity;
using Data;
using Microsoft.EntityFrameworkCore;
using Sink.Data;
using Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllHeaders",
                builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
});

builder.Services.AddApiVersioning(options => options.AssumeDefaultVersionWhenUnspecified = true).AddMvc();


builder.Services.AddDbContextFactory<ApplicationContext>(options =>
{
    options.EnableSensitiveDataLogging(true);
    options.UseNpgsql(builder.Configuration.GetConnectionString("AcsPostgres"));
});

builder.Services.AddAuthentication().AddJwtBearer();
builder.Services.AddTransient<AuthService>();
builder.Services
    .AddIdentity<ApplicationUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationContext>()
    .AddDefaultTokenProviders();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAllHeaders");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
