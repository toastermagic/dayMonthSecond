import {Component} from '@angular/core';
import {JobsService} from '../../shared';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdIcon} from '@angular2-material/icon';
import {MdRadioButton, MdRadioGroup} from '@angular2-material/radio';
import {MdRadioDispatcher} from '@angular2-material/radio/radio_dispatcher';

@Component({
  moduleId: 'app/home/check/',
  selector: 'dms-check',
  template: require('./check.component.html'),
  styles: [require('./check.component.scss')],
  directives: [MdIcon, MdRadioGroup, MdRadioButton, MD_CARD_DIRECTIVES],
  providers: [JobsService, MdRadioDispatcher]
})

export class CheckComponent {
  questions: boolean;
  name: string = 'paul';
  disableCreate: boolean = true;

  constructor(private jobsService: JobsService) {}

  create() {

  }
}
