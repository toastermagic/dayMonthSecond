import {Component} from '@angular/core';

@Component({
  moduleId: 'app/dashboard/',
  selector: 'app-dashboard',
  template: require<string>('./dashboard.component.html'),
  styles: [require<string>('./dashboard.component.scss')],
  directives: []
})

export class DashboardComponent {
}
