using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    ID = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    ID = table.Column<string>(type: "text", nullable: false),
                    UserAccountID = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: false),
                    Start = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    End = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsDone = table.Column<bool>(type: "boolean", nullable: false),
                    EventCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Events_Users_UserAccountID",
                        column: x => x.UserAccountID,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LoginHistories",
                columns: table => new
                {
                    ID = table.Column<string>(type: "text", nullable: false),
                    UserAccountID = table.Column<string>(type: "text", nullable: false),
                    Login = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    M_UserID = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoginHistories", x => x.ID);
                    table.ForeignKey(
                        name: "FK_LoginHistories_Users_M_UserID",
                        column: x => x.M_UserID,
                        principalTable: "Users",
                        principalColumn: "ID");
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "ID", "Name", "Password" },
                values: new object[] { "U-1", "Erster Nutzer", "Nutzerpassword" });

            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "ID", "End", "EventCreated", "IsDone", "Notes", "Start", "Title", "UserAccountID" },
                values: new object[,]
                {
                    { "E-1", new DateTime(2025, 9, 20, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 9, 20, 0, 0, 0, 0, DateTimeKind.Utc), false, "erste Notizen", new DateTime(2025, 9, 9, 0, 0, 0, 0, DateTimeKind.Utc), "erstes Event", "U-1" },
                    { "E-2", new DateTime(2025, 9, 20, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 9, 20, 0, 0, 0, 0, DateTimeKind.Utc), false, "Weitere Notizen zu diesem Event", new DateTime(2025, 9, 9, 0, 0, 0, 0, DateTimeKind.Utc), "2. Event", "U-1" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Events_UserAccountID",
                table: "Events",
                column: "UserAccountID");

            migrationBuilder.CreateIndex(
                name: "IX_LoginHistories_M_UserID",
                table: "LoginHistories",
                column: "M_UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "LoginHistories");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
