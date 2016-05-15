import { Input, Output, EventEmitter, Component, OnInit } from '@angular/core';
import { DmsJob, MdlUpgradeDirective } from '../../shared';

@Component({
    moduleId: 'app/home/job-list/job-display',
    selector: 'dms-job-display',
    template: require('./job-display.component.html'),
    styles: [require('./job-display.component.scss')],
    directives: [MdlUpgradeDirective]
})
export class JobDisplayComponent implements OnInit {
    @Input() job: DmsJob;

    @Output() onDelete = new EventEmitter<DmsJob>();
    @Output() onEdit = new EventEmitter<DmsJob>();

    constructor() { }

    ngOnInit() { }

    delete() {
        this.onDelete.emit(this.job);
    }

    edit() {
        this.onEdit.emit(this.job);
    }
}
