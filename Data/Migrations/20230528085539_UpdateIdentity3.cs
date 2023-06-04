using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateIdentity3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserRoles",
                table: "UserRoles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Roles",
                table: "Roles");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "AUsers");

            migrationBuilder.RenameTable(
                name: "UserRoles",
                newName: "AUserRoles");

            migrationBuilder.RenameTable(
                name: "Roles",
                newName: "ARoles");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AUsers",
                table: "AUsers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AUserRoles",
                table: "AUserRoles",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ARoles",
                table: "ARoles",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AUsers",
                table: "AUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AUserRoles",
                table: "AUserRoles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ARoles",
                table: "ARoles");

            migrationBuilder.RenameTable(
                name: "AUsers",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "AUserRoles",
                newName: "UserRoles");

            migrationBuilder.RenameTable(
                name: "ARoles",
                newName: "Roles");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRoles",
                table: "UserRoles",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Roles",
                table: "Roles",
                column: "Id");
        }
    }
}
