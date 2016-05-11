import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdIcon} from '@angular2-material/icon';
import {AuthService} from '../../shared';

@Component({
  moduleId: 'app/home/job-list/',
  selector: 'dms-joblist',
  template: require<string>('./job-list.component.html'),
  styles: [require<string>('./job-list.component.scss')],
  directives: [MdIcon, MD_CARD_DIRECTIVES]
})
export class JobListComponent implements OnInit {
  items: FirebaseListObservable<any[]>;

  connectedMessage: string = 'Unknown';

  constructor(private af: AngularFire, private auth: AuthService) {}

  ngOnInit() {
    this.auth.userChange$.subscribe((profile: dmsProfile) => {
      if (!profile) {
        // logged out, should route change to home
        return;
      }
      this.getJobs(profile);
    });
  }

  getJobs(profile: dmsProfile) {
    if (!this.auth.authenticated) {
      console.log('cannot fetch jobs without authentication');
      return;
    }

    let user = this.af.database.object('/user/' + profile.user_id);
    user.subscribe(u => console.log('fbuser', u));
  }

  addItem() {
    let id = this.generateUUID();
    const itemObservable = this.af.database.object('/item/' + id);
    itemObservable.set({ name: 'new name!', date: new Date() });
  }

  login() {
    const itemObservable = this.af.database.object('/user/' + this.auth.user.user_id);
    itemObservable.set({ name: 'new name!', date: new Date() });
  }

  private generateUUID() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now(); // use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
}
