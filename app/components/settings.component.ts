import {Component, ElementRef, Injectable, Input} from "angular2/core";
import {MATERIAL_DIRECTIVES, MdDialog, MdDialogConfig, MdDialogRef} from "ng2-material/all";
import {OnInit} from "angular2/core";
import {DOM} from "angular2/src/platform/dom/dom_adapter";

@Component({
    selector: "dialog-settings",
    directives: [MATERIAL_DIRECTIVES],
    providers: [ElementRef]
})
@Injectable()
export class SettingsComponent implements OnInit {

    status: string;

    constructor(public dialog: MdDialog) {
    }

    ngOnInit() {
        console.log(`settings component initialised`);
    }

    public show(ev: Event, el: ElementRef) {
        let config = new CustomDialogConfig()
            .fruit("Mango")
            .clickOutsideToClose(true)
            .targetEvent(ev);

        this.dialog.open(DialogCustom, el, config)
            .then((ref: MdDialogRef) => {
                ref.whenClosed.then((interesting) => {
                    if (interesting) {
                        this.status = "That article was interesting.";
                    } else {
                        this.status = "Look for something else.";
                    }
                })
            });
    }
}

class CustomDialogConfig extends MdDialogConfig {
    fruit(name: string) {
        this.context.fruit = name;
        return this;
    }
}

@Component({
    selector: "dialog-custom",
    templateUrl: "./app/components/settings.component.html",
    directives: [MATERIAL_DIRECTIVES]
})
class DialogCustom {
    @Input() fruit: string;
    constructor(private dialog: MdDialogRef) { }
}