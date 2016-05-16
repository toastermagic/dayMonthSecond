import {Input, HostListener, Directive, ElementRef} from '@angular/core';

// temporary workaround for: https://github.com/angular/angular/issues/8509
import {BrowserDomAdapter} from '@angular/platform-browser/src/browser/browser_adapter';

@Directive({
    selector: '[close-drawer]',
    providers: [BrowserDomAdapter]
})
export class CloseDrawerDirective {
    @Input() mglUpgrade;
    private elRef: ElementRef;

    constructor(private el: ElementRef,
        private dom: BrowserDomAdapter) {
        this.elRef = el;
    }

    @HostListener('click', ['$event.target'])
    onClick(btn) {
        // not happy with this, TODO: use drawer.toggleDisplay()
        let drawer = this.dom.query('.mdl-layout__drawer');
        let overlay = this.dom.query('.mdl-layout__obfuscator');

        if (drawer) {
            this.removeClass(drawer, 'is-visible');
        }

        if (overlay) {
            this.removeClass(overlay, 'is-visible');
        }
    }

    private hasClass(ele, cls) {
        return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    private removeClass(ele, cls) {
        if (this.hasClass(ele, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            ele.className = ele.className.replace(reg, ' ');
        }
    }
}
