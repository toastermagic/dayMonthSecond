import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdIcon} from '@angular2-material/icon';
import {AuthService, UUIDService} from '../../shared';
import {Observable} from 'rxjs';

@Component({
  moduleId: 'app/home/job-list/',
  selector: 'dms-joblist',
  template: require<string>('./job-list.component.html'),
  styles: [require<string>('./job-list.component.scss')],
  directives: [MdIcon, MD_CARD_DIRECTIVES]
})
export class JobListComponent implements OnInit {
  jobs: FirebaseListObservable<any[]>;
  user: FirebaseObjectObservable<any>;

  connectedMessage: string = 'Unknown';
  private _url: string;
  
  constructor(private af: AngularFire, private auth: AuthService, private uuid: UUIDService) { }

  ngOnInit() {
    this.auth.userChange$.subscribe((profile: dmsProfile) => {
      if (!profile) {
        // logged out, should route change to home
        return;
      }
      this._url = '/users/' + profile.user_id;
      this.getUser(this._url);
      this.jobs = this.af.database.list(this._url + '/jobs/');
    });
  }

  getUser(url: string) {
    if (!this.auth.authenticated) {
      console.log('cannot fetch jobs without auth0 authentication');
      return;
    }

    if (!this.af.auth) {
      console.log('cannot fetch jobs without firebase authentication');
      return;
    }

    this.af.database.object(url)
      .subscribe((user) => {
        this.user = user;
      });
  }

  addItem() {
    let id = this.uuid.generate();
    const itemObservable = this.af.database.object(this._url + '/jobs/' + id);
    itemObservable.set({ name: 'new job'});
  }
}
