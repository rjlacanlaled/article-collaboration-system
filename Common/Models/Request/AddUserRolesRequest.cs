namespace Common.Models.Request;

public record AddUserRolesRequest
{
    public int UserId { get; set; }
    public int RoleId { get; init; }
}