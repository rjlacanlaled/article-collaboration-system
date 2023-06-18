using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class Initialreate5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "ContractPayments");

            migrationBuilder.AddColumn<string>(
                name: "ClientEmail",
                table: "ContractPayments",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientEmail",
                table: "ContractPayments");

            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                table: "ContractPayments",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
