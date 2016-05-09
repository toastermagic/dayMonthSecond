using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace dayMonthSecond.Data.Migrations
{
    [Migration("201605051740")]
    public partial class CreateIdentitySchema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DmsUser",
                columns: table => new
                {
                    DmsUserId = table.Column<int>(nullable: false),
                    ExternalAuthId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DmsUser", x => x.DmsUserId);
                });

            migrationBuilder.CreateTable(
                name: "DmsJob",
                columns: table => new
                {
                    DmsJobId = table.Column<Guid>(nullable: false),
                    DmsUserId = table.Column<Guid>(nullable: false),
                    PollIdentifier = table.Column<Guid>(nullable: false),
                    JobName = table.Column<string>(nullable: false),
                    PollIntervalMinutes = table.Column<int>(nullable: false),
                    LastUpdated = table.Column<DateTime>(nullable: false),
                    Created = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DmsJobs", x => x.DmsJobId);
                    table.ForeignKey("FK_DmsJobs_DmsUser", j => j.DmsUserId, "DmsUser", "DmsUserId");
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DmsJob");

            migrationBuilder.DropTable(
                name: "DmsUser");
        }
    }
}