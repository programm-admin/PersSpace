﻿using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class AppDBProvider: DbContext
    {
        public AppDBProvider(DbContextOptions options) : base(options)
        {
        }

        public DbSet<M_User> Users { get; set; }
        public DbSet<M_Event> Events { get; set; }
        public DbSet<M_LoginHistory> LoginHistories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<M_Event>()
                .HasOne(e => e.User)
                .WithMany(e => e.Events)
                .HasForeignKey(e => e.UserAccountID);

            // seed data
            modelBuilder.Entity<M_User>().HasData(
                new M_User { ID = "U-1", Name = "Erster Nutzer", Password = "Nutzerpassword" }
            );

            DateTime GetUTCDate(int year, int month, int day) => new DateTime(year, month, day, 0, 0, 0, DateTimeKind.Utc);

            modelBuilder.Entity<M_Event>().HasData(
                new M_Event
                {
                    ID = "E-1",
                    Title = "erstes Event",
                    UserAccountID = "U-1",
                    Notes = "erste Notizen",
                    Start = GetUTCDate(2025, 9, 9),
                    End = GetUTCDate(2025, 9, 20),
                    Created = GetUTCDate(2025, 9, 20),
                    IsDone = false
                },
                new M_Event
                {
                    ID = "E-2",
                    Title = "2. Event",
                    UserAccountID = "U-1",
                    Notes = "Weitere Notizen zu diesem Event",
                    Start = GetUTCDate(2025, 9, 9),
                    End = GetUTCDate(2025, 9, 20),
                    Created = GetUTCDate(2025, 9, 20),
                    IsDone = false
                }
            );


            base.OnModelCreating(modelBuilder);
        }
    }
}
