using Microsoft.EntityFrameworkCore;

namespace ReactAspCRUD.Models
{
    public class StudentDbContext : DbContext
    {
        public StudentDbContext(DbContextOptions <StudentDbContext> options) : base(options)
        {
        }

        public DbSet<Student> Student { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=studentdb;Integrated Security=True;TrustServerCertificate=True");
        }

    }
}
