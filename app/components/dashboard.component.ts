import {OnInit, Component} from "angular2/core";
import {HomeComponent} from "../components/home.component";

@Component({
    selector: "dashboard",
    templateUrl: "./app/components/dashboard.component.html",
    directives: [HomeComponent]
})

export class DashboardComponent implements OnInit {

    dashPanels: any[] = [];
    
    constructor() {

    }

    ngOnInit() {
        console.log(`adding panel`);
        this.dashPanels.push(new HomeComponent());
    }
}