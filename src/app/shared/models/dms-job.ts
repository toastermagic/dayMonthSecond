export class DmsJob {
    $key: string;           // firebase generated pushUrl
    name: string;           // display name for job
    created: number;        // date job created, number because firebase don't do dates
    lastPoll: number;       // time of last ping, number because firebase don't do dates
    nextPollDue: number;    // deadline for next ping, number because firebase don't do dates
    notify: string;         // address to notify in case of overdue notification
    overdue: number;        // number of minutes after deadline to notify overdue
    interval: number;       // number of minutes between expected invocations of job
}