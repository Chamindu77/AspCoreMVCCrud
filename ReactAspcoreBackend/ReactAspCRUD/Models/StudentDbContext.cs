﻿using Microsoft.EntityFrameworkCore;

namespace ReactAspCRUD.Models
{
    public class StudentDbContext : DbContext
    {
        public StudentDbContext(DbContextOptions <StudentDbContext> options) : base(options)
        {
        }

        public DbSet<Student> Student { get; set; }
        public DbSet<User> User { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=userdb;Integrated Security=True;TrustServerCertificate=True");
        }

    }
}
