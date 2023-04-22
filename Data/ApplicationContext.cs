using Microsoft.EntityFrameworkCore;
using Common.Models.Core;

namespace Sink.Data;

public class ApplicationContext : DbContext
{
    public DbSet<Comment> Comments => Set<Comment>();
    public DbSet<Contract> Contracts => Set<Contract>();
    public DbSet<ContractPayment> ContractPayments => Set<ContractPayment>();
    public DbSet<Notification> Notifications => Set<Notification>();
    public DbSet<NotificationAssignee> NotificationAssignees => Set<NotificationAssignee>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<ProjectTask> ProjectTasks => Set<ProjectTask>();
    public DbSet<ProjectTaskAssignee> ProjectTaskAssignees => Set<ProjectTaskAssignee>();
    public DbSet<User> Users => Set<User>();
    public DbSet<UserDetail> UserDetails => Set<UserDetail>();
    public DbSet<UserRole> UserRoles => Set<UserRole>();

    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Set Primary Key
        modelBuilder.Entity<Comment>().HasKey(c => c.Id);
        modelBuilder.Entity<Contract>().HasKey(c => c.Id);
        modelBuilder.Entity<ContractPayment>().HasKey(c => c.Id);
        modelBuilder.Entity<Notification>().HasKey(n => n.Id);
        modelBuilder.Entity<NotificationAssignee>().HasKey(n => n.Id);
        modelBuilder.Entity<ProjectTask>().HasKey(pt => pt.Id);
        modelBuilder.Entity<ProjectTaskAssignee>().HasKey(pt => pt.Id);
        modelBuilder.Entity<Role>().HasKey(r => r.Id);
        modelBuilder.Entity<User>().HasKey(u => u.Id);
        modelBuilder.Entity<UserDetail>().HasKey(u => u.Id);
        modelBuilder.Entity<UserRole>().HasKey(u => u.Id);

        modelBuilder.Entity<Comment>().Property(c => c.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<Contract>().Property(c => c.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<ContractPayment>().Property(c => c.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<Notification>().Property(c => c.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<NotificationAssignee>().Property(c => c.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<ProjectTask>().Property(c => c.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<ProjectTaskAssignee>().Property(c => c.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<Role>().Property(c => c.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<User>().Property(c => c.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<UserDetail>().Property(c => c.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<UserRole>().Property(c => c.Id).ValueGeneratedOnAdd();

        base.OnModelCreating(modelBuilder);
    }
}