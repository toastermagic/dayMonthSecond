import {Component, OnInit} from '@angular/core';
import {CheckComponent} from './check';
import {JobListComponent} from './job-list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';

@Component({
  moduleId: 'app/home/',
  selector: 'app-home',
  template: require('./home.component.html'),
  styles: [require('./home.component.scss')],
  directives: [CheckComponent, JobListComponent, MD_CARD_DIRECTIVES],
  providers: []
})

export class HomeComponent implements OnInit {

  ngOnInit() { }
}
