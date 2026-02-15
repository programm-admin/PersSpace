using Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class AppDBProvider : DbContext
    {
        public AppDBProvider(DbContextOptions options) : base(options)
        {
        }

        public DbSet<UserEntity> Users { get; set; }
        public DbSet<MediaEventEntity> MediaEvents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserEntity>(user =>
            {
                user.HasKey(u => u.ID);
                user.HasMany(u => u.MediaEvents).WithOne(e => e.User).HasForeignKey(e => e.UserAccountId).OnDelete(DeleteBehavior.Cascade);
            });
            modelBuilder.Entity<MediaEventEntity>(mediaEvent => { mediaEvent.HasKey(e => e.Id); });

            base.OnModelCreating(modelBuilder);
        }
    }
}
