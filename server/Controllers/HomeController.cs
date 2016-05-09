using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using dayMonthSecond.Properties;
using System.Threading.Tasks;
using System.Linq;
using System.Security.Claims;

namespace dayMonthSecond
{
    public class HomeController : Controller
    {
        private readonly Auth0Settings _settings;
        private DmsRepository _repo;
        public HomeController(DmsRepository repo, IOptions<Auth0Settings> settings) {
            _settings = settings.Value;
            _repo = repo;
        }

        [HttpGet]
        public IActionResult Index() => Redirect(Url.Content("index.html"));
        
        [HttpGet]
        [AllowAnonymous]
        // [Authorize(ActiveAuthenticationSchemes = "Bearer")]
        public IActionResult Check() {
            var identity = User.Identity as ClaimsIdentity;
            var nameClaim = identity.Claims.SingleOrDefault(c => c.Type == ClaimTypes.Name);

            if (nameClaim == null) {
                return new ObjectResult(new CheckResponse());
            }
            
            var user = _repo.GetUserByExternalLogin(nameClaim.Value); 

            if (user == null) {
                return new ObjectResult(new CheckResponse(){ 
                    ExternalAuthId = nameClaim.Value
                    });
            }
            
            return new ObjectResult(new CheckResponse(){ 
                ExternalAuthId = nameClaim.Value,
                DmsUserId = user.DmsUserId
            });
        } 
    }
}