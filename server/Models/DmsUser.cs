using System;
using System.Collections.Generic;

namespace dayMonthSecond {
    public class DmsUser {
        public string DmsUserId { get; set; }
        public string ExternalAuthId { get; set; }
        public List<DmsJob> DmsJobs { get; set; }
    }
}