using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class AppDBProvider : DbContext
    {
        public AppDBProvider(DbContextOptions options) : base(options)
        {
        }

        public DbSet<M_User> Users { get; set; }
        public DbSet<M_MediaEvent> MediaEvents { get; set; }
        public DbSet<M_LoginHistory> LoginHistories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.Entity<M_MediaEvent>()
            //     .HasOne(e => e.User)
            //     .WithMany(e => e.Events)
            //     .HasForeignKey(e => e.UserAccountID);

            modelBuilder.Entity<M_MediaEvent>(entity =>
            {
                entity.HasKey(e => e.ID);
                entity.HasOne(e => e.User)
                    .WithMany(u => u.MediaEvents)
                    .HasForeignKey(e => e.UserAccountID)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
