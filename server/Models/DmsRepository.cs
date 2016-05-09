using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;

namespace dayMonthSecond
{
    public class DmsRepository
    {
        private readonly DmsDbContext _context;
 
        private readonly ILogger _logger;
 
        public DmsRepository(DmsDbContext context, ILoggerFactory loggerFactory)
        {
            _context = context;
            _logger = loggerFactory.CreateLogger("DmsRepository");
        }
        
        public IQueryable<DmsJob> GetJobsByUser(string dmsUserId) {
            return _context.DmsJobs.Where(u => u.DmsUserId == dmsUserId);
        }
        public DmsUser GetUserByExternalLogin(string externalAuthId) {
            return _context.DmsUsers.SingleOrDefault(u => u.ExternalAuthId == externalAuthId);
        }
        
        public void CreateNewUser(string externalAuthId) {
            var u = new DmsUser();
            u.ExternalAuthId = externalAuthId;
            u.DmsUserId = Guid.NewGuid().ToString();
            
            _context.DmsUsers.Add(u);
            _context.SaveChanges();
        }
    }
}
         