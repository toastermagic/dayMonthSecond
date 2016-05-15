import {Component, OnInit} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AuthService, DmsHelpers, DmsJob, MdlUpgradeDirective} from '../shared';
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

  constructor(
    private af: AngularFire,
    private auth: AuthService,
    private helpers: DmsHelpers) { }

  ngOnInit() {
    if (!this.auth.user) {
      console.error('showing job list, but no user!');
      return;
    }
    this.jobs = this.af.database.list('/users/' + this.auth.user.user_id + '/jobs/');
  }

  create() {
    let newJob = new DmsJob();
    newJob.created = new Date().getTime();
    newJob.name = 'New Job';

    console.log('creating job', newJob);
    this.jobs.push(newJob);
  }

  onSave(job: DmsJob) {
    console.log('updating job', job);
    this.jobs.update(job.$key, this.helpers.suppressKey(job));
  }

  onEdit(job: DmsJob) {
    console.log('editing job', job);
    // this.jobs.remove(jobId);
  }

  onDelete(jobId: string) {
    if (!jobId) {
      console.log('deleting with undefined key removes everything!')
      return;
    }
    console.log('deleting job', jobId);
    this.jobs.remove(jobId);
  }
}
