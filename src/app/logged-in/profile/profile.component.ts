import {Input, Component, ElementRef} from '@angular/core';
import {AuthService} from '../../shared';

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
  user: dmsProfile;
  public userProperties: any[];
  private dialog: any;

  get userPictureStyle() {
    return  {
      'background': 'url(' + this.user.picture + ') center / cover',
      'height': '150px'
    };
  }

  constructor(private auth: AuthService, private elRef: ElementRef) {
  }

  getUserProperties() {
    this.userProperties = Object.keys(this.user);
    return this.userProperties;
  }

  close() {
    this.dialog.close();
  }

  show() {
    // if (!this.dialog.showModal) {
    //   dialogPolyfill.registerDialog(dialog);
    // }
    this.dialog = this.elRef.nativeElement.firstElementChild;
    this.dialog.showModal();
  }
}
