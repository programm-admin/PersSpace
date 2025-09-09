using Microsoft.EntityFrameworkCore;
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

            modelBuilder.Entity<M_Event>().HasData(
                new M_Event
                {
                    ID = "E-1",
                    Title = "erstes Event",
                    UserAccountID = "U-1",
                    Notes = "erste Notizen",
                    Start = new DateTime(2025, 9, 9),
                    End = new DateTime(2025, 9, 20),
                    Created = new DateTime(),
                    IsDone = false
                },
                new M_Event
                {
                    ID = "E-2",
                    Title = "2. Event",
                    UserAccountID = "U-1",
                    Notes = "Weitere Notizen zu diesem Event",
                    Start = new DateTime(2025, 9, 9),
                    End = new DateTime(2025, 9, 20),
                    Created = new DateTime(),
                    IsDone = false
                }
            );


            base.OnModelCreating(modelBuilder);
        }
    }
}
