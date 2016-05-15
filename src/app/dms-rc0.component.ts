import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HomeComponent} from './home';
import {MdlUpgradeDirective} from './shared';
import {LoggedInComponent} from './logged-in';
import {JobListComponent} from './job-list';
import {ProfileComponent} from './profile';
import {AuthService, DmsProfile} from './shared';

import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';

@Component({
  moduleId: 'app',
  selector: 'dms-rc0-app',
  template: require('./dms-rc0.component.html'),
  styles: [ require('./dms-rc0.component.scss') ],
  directives: [HomeComponent, JobListComponent, LoggedInComponent, ProfileComponent,
              MdlUpgradeDirective, ROUTER_DIRECTIVES],
  providers: []
})
@Routes([
  {path: '/home', component: HomeComponent},
  {path: '/jobs', component: JobListComponent},
  {path: '/profile', component: ProfileComponent}
])
export class DmsRc0AppComponent implements OnInit {
  constructor(
      public auth: AuthService,
      private router: Router,
      private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.router.navigate(['/home']);

    this.auth.userChange$.subscribe((user: DmsProfile) => {
      console.log('new user, detecting changes', user ? user.nickname : null);
      this.cd.detectChanges();
    });
  }
}
