using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CantinasWebApi.Migrations
{
    /// <inheritdoc />
    public partial class AdicaoIdOwnerProduto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "idOwner",
                table: "Produtos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "idOwner",
                table: "Produtos");
        }
    }
}
