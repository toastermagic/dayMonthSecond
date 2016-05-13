import {Component, OnInit} from '@angular/core';
import {GetStartedComponent} from './get-started';
import {JobListComponent} from './job-list';

@Component({
  moduleId: 'app/home/',
  selector: 'app-home',
  template: require('./home.component.html'),
  styles: [require('./home.component.scss')],
  directives: [GetStartedComponent, JobListComponent],
  providers: []
})

export class HomeComponent implements OnInit {
  ngOnInit() { }
}
