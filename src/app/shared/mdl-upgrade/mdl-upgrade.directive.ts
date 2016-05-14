import {Input, Directive, ElementRef, AfterViewInit} from '@angular/core';

@Directive({
    selector: '[mdl-upgrade]'
})
export class MdlUpgradeDirective implements AfterViewInit {
    @Input() mglUpgrade;
    private elRef: ElementRef;

    constructor(el: ElementRef) {
        this.elRef = el;
    }

    ngAfterViewInit() {
        if (componentHandler == null) {
            console.log('componentHandler is undefined', this.elRef.nativeElement);
            return;
        }
        componentHandler.upgradeElement(this.elRef.nativeElement);
    }
}