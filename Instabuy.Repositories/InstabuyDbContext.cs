using Microsoft.EntityFrameworkCore;

namespace Instabuy.Data.Sql
{
    public class InstabuyDbContext : DbContext
    {
        private string _connectionString;

        public InstabuyDbContext(string connectionString) : base()
        {
            _connectionString = connectionString;
        }

        public DbSet<Sql.Models.User> Users { get; set; }
        public DbSet<Sql.Models.Filter> Filters { get; set; }
        public DbSet<Sql.Models.ApiKey> ApiKeys { get; set; }
        public DbSet<Sql.Models.HistoricalItemInfo> HistoricalItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Sql.Models.User>().HasKey(k => k.UserId);
            modelBuilder.Entity<Sql.Models.Filter>().HasKey(k => k.FilterId);
            modelBuilder.Entity<Sql.Models.ApiKey>().HasKey(k => k.ApiKeyId);
            modelBuilder.Entity<Sql.Models.HistoricalItemInfo>().HasKey(k => k.ItemId);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_connectionString);
            }
        }
    }
}
