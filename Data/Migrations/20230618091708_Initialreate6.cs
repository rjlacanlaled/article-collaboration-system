using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class Initialreate6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "ProjectTaskAssignees",
                newName: "UserEmail");

            migrationBuilder.RenameColumn(
                name: "RoleId",
                table: "ProjectTaskAssignees",
                newName: "RoleName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserEmail",
                table: "ProjectTaskAssignees",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "RoleName",
                table: "ProjectTaskAssignees",
                newName: "RoleId");
        }
    }
}
