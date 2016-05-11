import {Input, Component} from '@angular/core';
import {AuthService} from '../../../../../shared';
import {MdCard} from '@angular2-material/card';
import {MdIcon} from '@angular2-material/icon';
import {MdList} from '@angular2-material/list';

@Component({
  moduleId: 'app/toolbar/shared/logged-in/shared/profile/',
  selector: 'dms-profile',
  template: require<string>('./profile.component.html'),
  styles: [require<string>('./profile.component.scss')],
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
