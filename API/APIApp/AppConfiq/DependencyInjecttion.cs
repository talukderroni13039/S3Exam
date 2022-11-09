using APIApp.DAL;
using APIApp.Domain;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIApp
{
    public static class DependencyInjecttion
    {
        public static IServiceCollection AddRepository(this IServiceCollection services)
        {
            services.AddTransient<IItemRepository, ItemRepository>();
            return services;
        }
    }
}
