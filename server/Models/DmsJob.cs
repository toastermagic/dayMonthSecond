using System;

namespace dayMonthSecond
{
    public class DmsJob
    {
        public string DmsJobId { get; set; }

        public string PollIdentifier { get; set; }
        
        public string JobName { get; set; }
        
        public DateTime LastPollTime { get; set; }
        
        public int PollIntervalMinutes { get; set;}
         
        public string DmsUserId { get; set; }

        public DmsUser DmsUser { get; set; }
 
        public DateTime LastUpdated { get; set; }

        public DateTime Created { get; set; }
   }
}