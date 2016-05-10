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
    this.items = af.database.list('/item');
  }

  ngOnInit() { }

  addItem() {
    const itemObservable = this.af.database.object('/item');
    itemObservable.set({ name: 'new name!', date: new Date()});
  }
}
