import {Input, Component} from '@angular/core';
import {MdCard} from '@angular2-material/card';
import {MdIcon} from '@angular2-material/icon';
import {MdList} from '@angular2-material/list';
import {AuthService} from '../../../../../shared';

@Component({
  moduleId: 'app/toolbar/shared/logged-in/shared/profile/',
  selector: 'dms-profile',
  template: require('./profile.component.html'),
  styles: [require('./profile.component.scss')],
  directives: [MdCard, MdIcon, MdList],
  pipes: []
})

export class ProfileComponent {
  @Input()
  user: dmsProfile;
  public userProperties: any[];

  constructor(private auth: AuthService) {
  }

  getUserProperties() {
      this.userProperties = Object.keys(this.user);
      return this.userProperties;
  }
}
