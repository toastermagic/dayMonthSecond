import {Component} from '@angular/core';
import {AuthService} from '../../shared';
import {AngularFire} from 'angularfire2';

@Component({
  moduleId: 'app/home/get-started/',
  selector: 'dms-get-started',
  template: require('./get-started.component.html'),
  styles: [require('./get-started.component.scss')],
  directives: [],
  providers: [AuthService]
})

export class GetStartedComponent {
  questions: boolean;
  name: string = 'paul';
  disableCreate: boolean = true;

  constructor(private auth: AuthService, private af: AngularFire) {}

  create() {
    let url = '/users/' + this.auth.user.user_id;
    const itemObservable = this.af.database.object(url + '/jobs/');
    itemObservable.set({ name: this.auth.user.nickname});
  }
}
