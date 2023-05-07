using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Data;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Sink.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:3000");
            policy.AllowAnyMethod();
            policy.AllowAnyHeader();
        });
});

builder.Services.AddApiVersioning(options => options.AssumeDefaultVersionWhenUnspecified = true).AddMvc();

builder.Services.AddAuthentication(options =>
           {
               options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
               options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
           })
           .AddJwtBearer(options =>
           {
               options.Authority = "https://accounts.google.com";
               options.Audience = "710035087649-jes0lm5uk9m05cn8lfj71ihv6c6a4d4g.apps.googleusercontent.com";
           })
           .AddGoogle(options =>
           {
               options.ClientId = "710035087649-jes0lm5uk9m05cn8lfj71ihv6c6a4d4g.apps.googleusercontent.com";
               options.ClientSecret = "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";
               options.SignInScheme = JwtBearerDefaults.AuthenticationScheme;
           });

builder.Services.AddDbContextFactory<IdentityApplicationContext>(options =>
{
    options.EnableSensitiveDataLogging(true);
    options.UseNpgsql(builder.Configuration.GetConnectionString("AcsPostgres"));
});

builder.Services.AddDbContextFactory<ApplicationContext>(options =>
{
    options.EnableSensitiveDataLogging(true);
    options.UseNpgsql(builder.Configuration.GetConnectionString("AcsPostgres"));
});

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<IdentityApplicationContext>()
    .AddDefaultTokenProviders();

builder.Services.AddScoped<UserManager<ApplicationUser>>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
