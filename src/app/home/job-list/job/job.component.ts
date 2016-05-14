import { Input, Output, EventEmitter, Component, OnInit } from '@angular/core';
import { DmsJob, MdlUpgradeDirective } from '../../../shared';

@Component({
    moduleId: 'app/home/job-list/job',
    selector: 'dms-job',
    template: require('./job.component.html'),
    styles: [require('./job.component.scss')],
    directives: [MdlUpgradeDirective]
})
export class JobComponent implements OnInit {
    @Input() job: DmsJob;
    @Output() onDelete = new EventEmitter<string>();
    @Output() onSave = new EventEmitter<DmsJob>();

    constructor() { }

    ngOnInit() { }

    save() {
        this.onSave.emit(this.job);
    }

    delete() {
        this.onDelete.emit(this.job.$key);
    }
}
