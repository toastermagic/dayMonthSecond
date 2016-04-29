using System.Security.Claims;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;

using dayMonthSecond.Properties;

namespace dayMonthSecond
{
    public class Startup
    {
        public IConfiguration Configuration { get; set; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                 .AddJsonFile("config.json")
                 .AddJsonFile($"config.{env.EnvironmentName}.json", optional:true);

            this.Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<Auth0Settings>(Configuration.GetSection("Auth0Settings"));

            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(LogLevel.Debug);

            app.UseStaticFiles();

            var logger = loggerFactory.CreateLogger("dayMonthSecond");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
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
                        //claimsIdentity.AddClaim(new Claim(ClaimTypes.Name, claimsIdentity.FindFirst("name").Value));
                        
                        return Task.FromResult(0);
                    },

                }
            };

            app.UseJwtBearerAuthentication(options);

            app.UseMvc(r =>
            {
                r.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}");
            });
        }
    }
}