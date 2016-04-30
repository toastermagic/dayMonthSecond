import {Component, ElementRef} from "angular2/core";
import {AuthService} from "../services/auth.service";
import {SettingsComponent} from "../components/settings.component";
import {MATERIAL_DIRECTIVES, MdDialog, MdDialogConfig, MdDialogRef} from "ng2-material/all";

@Component({
    selector: "toolbar",
    templateUrl: "./app/components/toolbar.component.html",
    providers: [AuthService, ElementRef, SettingsComponent]
})

export class ToolbarComponent {

    constructor(public auth: AuthService, public settings: SettingsComponent, public element: ElementRef) {
    }

    onSettings(ev: Event) {
        this.settings.show(ev, this.element);
    }

    clicked(message: string) {
        alert(message);
    }
}