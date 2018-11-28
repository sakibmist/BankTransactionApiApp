using Microsoft.EntityFrameworkCore;

namespace ProjectApi.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) :base(options)
        {
            
        }

        public virtual DbSet<Account>  Accounts {get; set ;}
        public virtual DbSet<Transaction>  Transactions {get; set ;}
    }
}