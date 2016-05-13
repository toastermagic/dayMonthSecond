import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {AuthService, UUIDService} from '../../shared';
import {Observable} from 'rxjs';
import {DmsJob} from '../../shared/models';
import {JobComponent} from './job';

@Component({
  moduleId: 'app/home/job-list/',
  selector: 'dms-joblist',
  template: require('./job-list.component.html'),
  styles: [require('./job-list.component.scss')],
  directives: [JobComponent]
})
export class JobListComponent implements OnInit {
  jobs: FirebaseListObservable<DmsJob[]>;

  connectedMessage: string = 'Unknown';
  private url: string;

  constructor(
    private af: AngularFire,
    private auth: AuthService,
    private uuid: UUIDService) { }

  ngOnInit() {
    this.auth.userChange$.subscribe((profile: dmsProfile) => {
      if (!profile) {
        // logged out, should route change to home
        return;
      }
    });

    this.url = '/users/' + this.auth.user.user_id + '/jobs/';
    this.jobs = this.af.database.list(this.url);
  }

  create() {
    let newJob = new DmsJob();
    newJob.created = new Date().getTime();
    newJob.intervalMinutes = 60;
    newJob.name = 'New Job';

    let id = this.uuid.generate();
    const itemObservable = this.af.database.object(this.url + id);
    itemObservable.set(newJob);
  }
}
