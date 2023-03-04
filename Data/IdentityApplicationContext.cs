using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


namespace Data;

public class IdentityApplicationContext : IdentityDbContext<ApplicationUser>
{
    #region Core Models
    public DbSet<ApplicationUser> ApplicationUsers => Set<ApplicationUser>();
    #endregion

    public IdentityApplicationContext(DbContextOptions<IdentityApplicationContext> options) : base(options) { }
}