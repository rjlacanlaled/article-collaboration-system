namespace Common.Models.Core;

public class UserRole
{
    public int Id { get; init; }
    public int UserId { get; set; }
    public int RoleId { get; set; }
}