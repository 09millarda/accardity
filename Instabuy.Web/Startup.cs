﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Instabuy.Data.Sql;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Instabuy.Web
{
    public class Startup
    {
        public Startup()
        {
            var builder = new ConfigurationBuilder();
            builder.AddEnvironmentVariables()
                   .AddUserSecrets(nameof(Instabuy.Web));

            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(s => new InstabuyDbContext(Configuration["ConnectionStrings:DefaultConnection"]));
            services.AddRepositories();
            services.AddCors(o =>
            {
                o.AddPolicy("DevPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors("DevPolicy");
            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}