import {Component, OnInit} from '@angular/core';
import {HomeComponent} from './home';
import {MdlUpgradeDirective} from './shared';
import {LoggedInComponent} from './logged-in';
import {AuthService} from './shared';

import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';

@Component({
  moduleId: 'app',
  selector: 'dms-rc0-app',
  template: require('./dms-rc0.component.html'),
  styles: [ require('./dms-rc0.component.scss') ],
  directives: [HomeComponent, MdlUpgradeDirective, LoggedInComponent, ROUTER_DIRECTIVES],
  providers: []
})
@Routes([
  {path: '/home', component: HomeComponent}
])
export class DmsRc0AppComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.router.navigate(['/home']);
  }
}
