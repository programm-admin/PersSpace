using Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class AppDBProvider : DbContext
    {
        public AppDBProvider(DbContextOptions options) : base(options) {}

        public DbSet<UserEntity> Users { get; set; }
        public DbSet<GeneralEventEntity> GeneralEvents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserEntity>(user =>
            {
                user.HasKey(u => u.ID);
                user.HasMany(u => u.GeneralEvents).WithOne(e => e.User).HasForeignKey(e => e.UserAccountId).IsRequired().OnDelete(DeleteBehavior.Cascade);
            });
            modelBuilder.Entity<GeneralEventEntity>(mediaEvent =>
            {
                mediaEvent.HasOne(e => e.User).WithMany(u => u.GeneralEvents).HasForeignKey(e => e.UserAccountId).IsRequired().OnDelete(DeleteBehavior.Cascade);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
