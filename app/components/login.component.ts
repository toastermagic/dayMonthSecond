import {Component, OnInit} from "angular2/core";
import {AuthService} from "../services/auth.service";

@Component({
    selector: "login-component",
    templateUrl: "./app/components/login.component.html",
    providers: [AuthService],
})

export class LoginComponent implements OnInit {

    constructor(public auth: AuthService) {
        console.log(`login component constructed`);
    }

    ngOnInit() {
        console.log(`login component initialised`);
    }
}
