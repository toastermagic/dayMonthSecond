import {Input, Component, ElementRef} from '@angular/core';
import {AuthService, DmsProfile} from '../shared';

@Component({
  moduleId: 'app/toolbar/shared/logged-in/shared/profile/',
  selector: 'dms-profile',
  template: require('./profile.component.html'),
  styles: [require('./profile.component.scss')],
  directives: [],
  pipes: []
})

export class ProfileComponent {
  @Input()
  user: DmsProfile;
  public userProperties: any[];
  private dialog: any;

  get userPictureStyle() {
    return  {
      'background': 'url(' + this.auth.user.picture + ') center / cover',
      'height': '150px'
    };
  }

  constructor(private auth: AuthService, private elRef: ElementRef) {
  }

  getUserProperties() {
    this.userProperties = Object.keys(this.auth.user);
    return this.userProperties;
  }
}
