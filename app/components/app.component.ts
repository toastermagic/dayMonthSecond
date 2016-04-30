import {Component} from "angular2/core";
import {RouteConfig} from "angular2/router";
import {HomeComponent} from "../components/home.component";
import {ToolbarComponent} from "../components/toolbar.component";
import {AuthService} from "../services/auth.service";

@Component({
    selector: "my-app",
    templateUrl: "./app/components/app.component.html",
    directives: [ToolbarComponent, HomeComponent],
    providers: [AuthService]
})

@RouteConfig([
    { path: "/index.html", name: "Home", component: HomeComponent }
])

export class AppComponent {

    constructor(public auth: AuthService) {

    }

    clicked(message: string) {
        alert(message);
    }
}