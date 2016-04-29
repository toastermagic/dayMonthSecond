using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using dayMonthSecond.Properties;

namespace dayMonthSecond
{
    public class HomeController : Controller
    {
        private readonly Auth0Settings _settings;
        
        public HomeController(IOptions<Auth0Settings> settings) {
            _settings = settings.Value;
        }
        
        [HttpGet]
        public IActionResult Index() => View();
        
        [HttpGet]
        [Authorize(ActiveAuthenticationSchemes = "Bearer")]
        public IActionResult Things() => 
            new ObjectResult(new string[] {"So this is 2 things now?"});
    }
}