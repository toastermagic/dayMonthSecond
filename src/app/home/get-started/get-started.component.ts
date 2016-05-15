import {Component} from '@angular/core';
import {AuthService, DmsHelpers, MdlUpgradeDirective} from '../../shared';
import {AngularFire} from 'angularfire2';

@Component({
  moduleId: 'app/home/get-started/',
  selector: 'dms-get-started',
  template: require('./get-started.component.html'),
  styles: [require('./get-started.component.scss')],
  directives: [MdlUpgradeDirective],
  providers: [AuthService]
})

export class GetStartedComponent {
  questions: boolean;
  name: string = 'paul';
  disableCreate: boolean = true;

  constructor(private auth: AuthService,
              private af: AngularFire,
              private helpers: DmsHelpers) {}

  create() {
    let url = '/users/' + this.auth.user.user_id;
    console.log('setting new user as', url);
    const itemObservable = this.af.database.object(url);

    let sanitised = this.helpers.sanitiseProfile(this.auth.user);

    itemObservable.set({
      profile: sanitised
    });
  }
}
