using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class Initialreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "SeoId",
                table: "Contracts");

            migrationBuilder.AddColumn<string>(
                name: "ClientEmail",
                table: "Contracts",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SeoEmail",
                table: "Contracts",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientEmail",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "SeoEmail",
                table: "Contracts");

            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                table: "Contracts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SeoId",
                table: "Contracts",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
