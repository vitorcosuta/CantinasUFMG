using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CantinasWebApi.Migrations
{
    /// <inheritdoc />
    public partial class AdicaoFotoUsuario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Photo",
                table: "Users",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Photo",
                table: "Users");
        }
    }
}
