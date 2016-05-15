import { Input, Output, EventEmitter, Component, OnInit } from '@angular/core';
import { DmsJob, MdlUpgradeDirective } from '../../shared';

@Component({
    moduleId: 'app/home/job-list/job-edit',
    selector: 'dms-job-edit',
    template: require('./job-edit.component.html'),
    styles: [require('./job-edit.component.scss')],
    directives: [MdlUpgradeDirective]
})
export class JobEditComponent implements OnInit {
    @Input() job: DmsJob;
    @Output() onCreate = new EventEmitter<DmsJob>();

    constructor() { }

    ngOnInit() { }

    create() {
        this.onCreate.emit(this.job);
    }
}
