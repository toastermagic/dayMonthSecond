import {Component, OnInit} from '@angular/core';
import {HomeComponent} from './home';
import {DashboardComponent} from './dashboard';
import {ToolbarComponent} from './toolbar';
import {SidebarComponent} from './sidebar';

import {AuthService} from './shared';

import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';

@Component({
  moduleId: 'app',
  selector: 'dms-rc0-app',
  template: require<string>('./dms-rc0.component.html'),
  styles: [ require<string>('./dms-rc0.component.scss') ],
  directives: [HomeComponent, ToolbarComponent, SidebarComponent, ROUTER_DIRECTIVES],
  providers: []
})
@Routes([
  {path: '/home', component: HomeComponent},
  {path: '/dash', component: DashboardComponent},
])
export class DmsRc0AppComponent implements OnInit {
  constructor(auth: AuthService, private router: Router) {}

  sidebarState: boolean;

  onOpenSidebar(val: boolean) {
    this.sidebarState = true;
  }

  ngOnInit() {
    // this.sidebarState = true;
    this.router.navigate(['/home']);
  }
}
