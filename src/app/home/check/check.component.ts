import {Component} from '@angular/core';
import {JobsService} from '../../shared';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdIcon} from '@angular2-material/icon';

@Component({
  moduleId: 'app/home/check/',
  selector: 'dms-check',
  template: require<string>('./check.component.html'),
  styles: [require<string>('./check.component.scss')],
  directives: [MdIcon, MD_CARD_DIRECTIVES],
  providers: [JobsService]
})

export class CheckComponent {
  checkEnabled: Boolean = true;
  checkResult: Boolean = null;
  userId: string;
  failMessage: string;
  resultTime: Date = null;

  constructor(private jobsService: JobsService) {}

  private enableCheck(enabled) { this.checkEnabled = enabled; }

  checkServer() {
    this.enableCheck(false);
    this.checkResult = null;

    this.jobsService.getApiResponse().subscribe(
        response => {
          this.checkResult = true;
          this.failMessage = null;
          this.userId = response.ExternalAuthId;
          this.resultTime = new Date;
        },
        err => {
          this.checkResult = false;
          this.failMessage = err;
          this.userId = null;
          this.enableCheck(true);
          this.resultTime = new Date;
        },
        () => { this.enableCheck(true); });
  }
}
