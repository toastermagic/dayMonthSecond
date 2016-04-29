import {Component} from "angular2/core";
import {RouteConfig} from "angular2/router";
import {ArbitraryComponent} from "../components/arbitrary.component";

@Component({
    selector: "my-app",
    template: `<h3>Angular 2, with Auth0 via VSCode & dotnetcli</h3>
    
    <arbitrary-component>`,
    directives: [ArbitraryComponent]
})

@RouteConfig([
  {path:"/", name: "Home", component: ArbitraryComponent}
])

export class AppComponent {
    // constructor() { }
}
