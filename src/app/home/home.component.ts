import {Component, OnInit} from '@angular/core';
import {CheckComponent} from './check';

@Component({
  moduleId: 'app/home/',
  selector: 'app-home',
  template: require<string>('./home.component.html'),
  styles: [require<string>('./home.component.scss')],
  directives: [CheckComponent],
  providers: []
})

export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
