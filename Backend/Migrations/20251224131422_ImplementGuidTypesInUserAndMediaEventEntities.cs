using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class ImplementGuidTypesInUserAndMediaEventEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Users_UserAccountID",
                table: "Events");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Events",
                table: "Events");

            migrationBuilder.DeleteData(
                table: "Events",
                keyColumn: "ID",
                keyValue: "E-1");

            migrationBuilder.DeleteData(
                table: "Events",
                keyColumn: "ID",
                keyValue: "E-2");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: "U-1");

            migrationBuilder.RenameTable(
                name: "Events",
                newName: "MediaEvents");

            migrationBuilder.RenameIndex(
                name: "IX_Events_UserAccountID",
                table: "MediaEvents",
                newName: "IX_MediaEvents_UserAccountID");

            migrationBuilder.AlterColumn<Guid>(
                name: "ID",
                table: "Users",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "GoogleID",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<Guid>(
                name: "M_UserID",
                table: "LoginHistories",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "UserAccountID",
                table: "MediaEvents",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<Guid>(
                name: "ID",
                table: "MediaEvents",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MediaEvents",
                table: "MediaEvents",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_MediaEvents_Users_UserAccountID",
                table: "MediaEvents",
                column: "UserAccountID",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MediaEvents_Users_UserAccountID",
                table: "MediaEvents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MediaEvents",
                table: "MediaEvents");

            migrationBuilder.DropColumn(
                name: "GoogleID",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "MediaEvents",
                newName: "Events");

            migrationBuilder.RenameIndex(
                name: "IX_MediaEvents_UserAccountID",
                table: "Events",
                newName: "IX_Events_UserAccountID");

            migrationBuilder.AlterColumn<string>(
                name: "ID",
                table: "Users",
                type: "text",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<string>(
                name: "M_UserID",
                table: "LoginHistories",
                type: "text",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserAccountID",
                table: "Events",
                type: "text",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<string>(
                name: "ID",
                table: "Events",
                type: "text",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Events",
                table: "Events",
                column: "ID");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "ID", "Email", "Name", "PictureUrl" },
                values: new object[] { "U-1", "vorname.nachname@example.local", "Erster Nutzer", "_blank" });

            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "ID", "End", "IsDone", "MediaEventCreated", "Notes", "Start", "Title", "UserAccountID" },
                values: new object[,]
                {
                    { "E-1", new DateTime(2025, 9, 20, 0, 0, 0, 0, DateTimeKind.Utc), false, new DateTime(2025, 9, 20, 0, 0, 0, 0, DateTimeKind.Utc), "erste Notizen", new DateTime(2025, 9, 9, 0, 0, 0, 0, DateTimeKind.Utc), "erstes Event", "U-1" },
                    { "E-2", new DateTime(2025, 9, 20, 0, 0, 0, 0, DateTimeKind.Utc), false, new DateTime(2025, 9, 20, 0, 0, 0, 0, DateTimeKind.Utc), "Weitere Notizen zu diesem Event", new DateTime(2025, 9, 9, 0, 0, 0, 0, DateTimeKind.Utc), "2. Event", "U-1" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Users_UserAccountID",
                table: "Events",
                column: "UserAccountID",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
