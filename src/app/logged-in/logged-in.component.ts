import { Input, Component, OnInit } from '@angular/core';
import {AuthService} from '../shared';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {ProfileComponent} from './profile';
import {MdlUpgradeDirective, DmsProfile} from '../shared';

@Component({
  moduleId: 'app/toolbar/logged-in/',
  selector: 'dms-logged-in',
  template: require('./logged-in.component.html'),
  styles: [require('./logged-in.component.scss')],
  directives: [ROUTER_DIRECTIVES, MdlUpgradeDirective, ProfileComponent]
})
export class LoggedInComponent implements OnInit {

  @Input()
  user: DmsProfile;

  constructor(private auth: AuthService) {}

  ngOnInit() {
  }

}
