using System;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.Sqlite;
using dayMonthSecond.Properties;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.AspNetCore.DataProtection;

namespace dayMonthSecond
{
    public class Startup
    {
        public IConfiguration Configuration { get; set; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                 .AddJsonFile("config.json")
                 //  .AddJsonFile($"config.{env.EnvironmentName}.json", optional: true);
                 .AddJsonFile("config.Production.json");

            this.Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<Auth0Settings>(Configuration.GetSection("Auth0Settings"));

            var connection = Configuration["SqliteConnectionString"];

            services.AddEntityFramework()
                .AddDbContext<DmsDbContext>(options =>
                    options.UseSqlite(connection))                
                .AddDbContext<ApplicationDbContext>(options =>
                    options.UseSqlite(connection));

            services.AddIdentity<ApplicationUser, IdentityRole>(options => {
                options.Cookies.ApplicationCookie.AuthenticationScheme = "ApplicationCookie";
                options.Cookies.ApplicationCookie.DataProtectionProvider 
                    = DataProtectionProvider.Create(new DirectoryInfo("e:\\Github\\Identity\\artifacts"));
                options.Cookies.ApplicationCookie.CookieName = "Interop";
            })
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();
            services.AddScoped<DmsRepository, DmsRepository>();

            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(LogLevel.Debug);

            var logger = loggerFactory.CreateLogger("dayMonthSecond");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            try
            {
                using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>()
                    .CreateScope())
                {
                    serviceScope.ServiceProvider.GetService<DmsDbContext>()
                         .Database.EnsureCreated();

                    serviceScope.ServiceProvider.GetService<DmsDbContext>()
                         .Database.Migrate();
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            var settings = app.ApplicationServices.GetService<IOptions<Auth0Settings>>();

            var keyAsBase64 = settings.Value.ClientSecret.Replace('_', '/').Replace('-', '+');
            var keyAsBytes = System.Convert.FromBase64String(keyAsBase64);

            var options = new JwtBearerOptions()
            {
                AutomaticChallenge = true,
                AutomaticAuthenticate = true,
                Audience = settings.Value.ClientId,
                Authority = $"https://{settings.Value.Domain}",
                TokenValidationParameters = new TokenValidationParameters()
                {
                    IssuerSigningKey = new SymmetricSecurityKey(keyAsBytes)
                },
                Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        logger.LogError("Authentication failed.", context.Exception);
                        return Task.FromResult(0);
                    },
                    OnTokenValidated = context =>
                    {
                        var claimsIdentity = context.Ticket.Principal.Identity as ClaimsIdentity;
                        claimsIdentity.AddClaim(new Claim("id_token",
                            context.Request.Headers["Authorization"][0].Substring(context.Ticket.AuthenticationScheme.Length + 1)));

                        // OPTIONAL: you can read/modify the claims that are populated based on the JWT
                        claimsIdentity.AddClaim(new Claim(ClaimTypes.Name, claimsIdentity.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value));

                        return Task.FromResult(0);
                    },

                }
            };

            app.UseJwtBearerAuthentication(options);

            // app.Use(async (context, next) =>
            //     {
            //         await next();
            //         if (context.Response.StatusCode == 404)
            //         {
            //             if (!context.Request.Path.Value.EndsWith(".map") && 
            //                 !context.Request.Path.Value.EndsWith(".js"))
            //             {
            //                 context.Request.Path = "/"; 
            //             }
            //             await next();
            //         }
            //     });
            app.UseIdentity()
               .UseFacebookAuthentication(new FacebookOptions
               {
                   AppId = "901611409868059",
                   AppSecret = "4aa3c530297b1dcebc8860334b39668b"
               })
                .UseGoogleAuthentication(new GoogleOptions
                {
                    ClientId = "952880953148-qan68grdf7thul72n252q4crc8taa2br.apps.googleusercontent.com",
                    ClientSecret = "kSAvzYJOiElL5syNJY6W01Hh"
                })
                .UseTwitterAuthentication(new TwitterOptions
                {
                    ConsumerKey = "BSdJJ0CrDuvEhpkchnukXZBUv",
                    ConsumerSecret = "xKUNuKhsRdHD03eLn67xhPAyE1wFFEndFo1X2UJaK2m1jdAxf4"
                });

            app.UseDefaultFiles();

            app.UseStaticFiles();

            app.UseMvc(r =>
            {
                r.MapRoute(
                    name: "default",
                    template: "api/{controller=Home}/{action=Index}");

                // r.MapRoute(
                //     name: "spa-fallback",
                //     template: "{*url}",
                //     defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}