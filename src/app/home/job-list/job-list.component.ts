import {Component, OnInit, Input} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AuthService, DmsHelpers, DmsProfile, DmsJob, MdlUpgradeDirective} from '../../shared';
import {JobDisplayComponent} from './job-display';
import {JobEditComponent} from './job-edit';

@Component({
  moduleId: 'app/home/job-list/',
  selector: 'dms-joblist',
  template: require('./job-list.component.html'),
  styles: [require('./job-list.component.scss')],
  directives: [JobDisplayComponent, JobEditComponent, MdlUpgradeDirective]
})
export class JobListComponent implements OnInit {
  jobs: FirebaseListObservable<DmsJob[]>;

  @Input() user: DmsProfile;

  connectedMessage: string = 'Unknown';
  private url: string;

  constructor(
    private af: AngularFire,
    private auth: AuthService,
    private helpers: DmsHelpers) { }

  ngOnInit() {
    if (!this.user) {
      console.error('showing job list, but no user!');
      return;
    }
    this.url = '/users/' + this.user.user_id + '/jobs/';
    this.jobs = this.af.database.list(this.url);
  }

  onSave(job: DmsJob) {
    console.log('updating job', job);
    this.jobs.update(job.$key, this.helpers.suppressKey(job));
  }

  onDelete(jobId: string) {
    if (!jobId) {
      console.log('deleting with undefined key removes everything!')
      return;
    }
    console.log('deleting job', jobId);
    this.jobs.remove(jobId);
  }

  create() {
    let newJob = new DmsJob();
    newJob.created = new Date().getTime();
    newJob.intervalMinutes = 60;
    newJob.name = 'New Job';

    console.log('creating job', newJob);
    this.jobs.push(newJob);
  }
}
