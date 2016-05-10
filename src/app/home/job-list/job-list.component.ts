import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdIcon} from '@angular2-material/icon';

@Component({
  moduleId: 'app/home/job-list/',
  selector: 'dms-joblist',
  template: require<string>('./job-list.component.html'),
  styles: [require<string>('./job-list.component.scss')],
  directives: [MdIcon, MD_CARD_DIRECTIVES]
})
export class JobListComponent implements OnInit {
  items: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) {
  }

  ngOnInit() {
    // this.af.auth.subscribe((data) => {
    //   if (data) {
    //     console.log('angularFire has auth data', data);
    //     this.items = this.af.database.list('/item');
    //   } else {
    //     console.log('angularFire has no auth data', data);
    //   }
    // });
  }

  addItem() {
    let id = this.generateUUID();
    const itemObservable = this.af.database.object('/item/' + id);
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
