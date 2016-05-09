import { Input, Component, OnInit } from '@angular/core';
import {Auth0identity,Auth0profile, AuthService} from '../../../shared';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {MdButton, MdAnchor} from '@angular2-material/button';
import {MdIcon} from '@angular2-material/icon';
import {ProfileComponent} from './shared/profile';

@Component({
  moduleId: 'app/toolbar/shared/logged-in/',
  selector: 'dms-logged-in',
  template: require<string>('./logged-in.component.html'),
  styles: [require<string>('./logged-in.component.scss')],
  directives: [ROUTER_DIRECTIVES, MdButton, MdAnchor, MdIcon, ProfileComponent]
})
export class LoggedInComponent implements OnInit {

  @Input()
  user: Auth0profile;

  constructor(private auth: AuthService) {}

  ngOnInit() {
  }

}
