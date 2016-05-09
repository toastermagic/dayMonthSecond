using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace dayMonthSecond
{
    public class DmsDbContext : DbContext
    {
        public DbSet<DmsUser> DmsUsers { get; set; }
        public DbSet<DmsJob> DmsJobs { get; set; }
     
        public DmsDbContext(DbContextOptions<DmsDbContext> opt) : base(opt) {
            
        }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<DmsJob>()
                .HasKey(j => j.DmsJobId);

            builder.Entity<DmsJob>()
                .HasOne(j => j.DmsUser)
                .WithMany(j => j.DmsJobs)
                .HasForeignKey(j => j.DmsUserId);
            
            builder.Entity<DmsUser>()
                .HasKey(u => u.DmsUserId);
            
            //otherwise it will pluralise, and look for a 'DmsUsers' table             
            builder.Entity<DmsUser>().ToTable("DmsUser");
            
            //otherwise it will pluralise, and look for a 'DmsJobs' table             
            builder.Entity<DmsJob>().ToTable("DmsJob");

            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
        
        public override int SaveChanges()
        {
            this.ChangeTracker.DetectChanges();

            var entries = this.ChangeTracker.Entries<DmsJob>()
                .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach (var entry in entries)
            {
                entry.Property("LastUpdated").CurrentValue = DateTime.UtcNow;
            }

            return base.SaveChanges();
        }
    }
}