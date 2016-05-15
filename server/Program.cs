using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Builder;

namespace dayMonthSecond
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                        .UseKestrel()
                        .UseContentRoot(Directory.GetCurrentDirectory())
                        .UseStartup<Startup>()
                        .UseUrls("http://0.0.0.0:5000")
                        .Build();

            host.Run();
        }
    }
}