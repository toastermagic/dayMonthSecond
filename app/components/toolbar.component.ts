import {Component} from "angular2/core";
import {AuthService} from "../services/auth.service";
import {SettingsComponent} from "../components/settings.component";
import {MATERIAL_DIRECTIVES, MdDialog, MdDialogConfig, MdDialogRef} from "ng2-material/all";

@Component({
    selector: "toolbar",
    templateUrl: "./app/components/toolbar.component.html",
    providers: [AuthService, SettingsComponent]
})

export class ToolbarComponent {

    constructor(public auth: AuthService, public settings: SettingsComponent) {
    }

    onSettings(ev: Event) {
        this.settings.show(ev);
    }

    clicked(message: string) {
        alert(message);
    }
}