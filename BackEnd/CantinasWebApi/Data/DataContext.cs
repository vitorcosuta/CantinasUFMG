﻿using Microsoft.EntityFrameworkCore;

namespace CantinasWebApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) 
        {
        
        }

        public DbSet<User> Users => Set<User>();
    }
}
