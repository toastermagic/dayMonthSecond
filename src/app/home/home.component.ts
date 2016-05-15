import {Component, OnInit} from '@angular/core';
import {GetStartedComponent} from './get-started';
import {AuthService} from '../shared';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  moduleId: 'app/home/',
  selector: 'app-home',
  template: require('./home.component.html'),
  styles: [require('./home.component.scss')],
  directives: [GetStartedComponent, ROUTER_DIRECTIVES],
  providers: []
})

export class HomeComponent implements OnInit {
  constructor(public auth: AuthService) {}
  
  ngOnInit() { }
}
