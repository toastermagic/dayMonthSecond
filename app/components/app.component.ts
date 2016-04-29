import {Component} from "angular2/core";
import {RouteConfig} from "angular2/router";
import {HomeComponent} from "../components/home.component";
import {LoginComponent} from "../components/login.component";

@Component({
    selector: "my-app",
    templateUrl: "./app/components/app.component.html",
    directives: [LoginComponent, HomeComponent]
})

@RouteConfig([
    { path: "/app/index.html", name: "Home", component: HomeComponent }
])

export class AppComponent {

    constructor() {

    }

    clicked(message: string) {
        alert(message);
    }
}