import {Component, ElementRef, Input} from "angular2/core";
import {MATERIAL_DIRECTIVES, MdDialog, MdDialogConfig, MdDialogRef} from "ng2-material/all";
import {OnInit} from "angular2/core";
import {DOM} from "angular2/src/platform/dom/dom_adapter";

export class SettingsComponent implements OnInit {

    status: string;

    constructor(public dialog: MdDialog) {
        console.log(`settings component constructed`, dialog);
    }

    ngOnInit() {
        console.log(`settings component initialised`);
    }

    public show(ev: Event) {
        let config = new CustomDialogConfig()
            .fruit("Mango")
            .clickOutsideToClose(false)
            .targetEvent(ev);

        let jeff = new MdDialogRef();

        this.dialog.open(DialogCustom, null, config)
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
  templateUrl: "settings.component.html",
  directives: [MATERIAL_DIRECTIVES]
})
class DialogCustom {
    @Input() fruit: string;
    constructor(private dialog: MdDialogRef) { }
}