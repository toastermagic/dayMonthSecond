import {Component, OnInit} from "angular2/core";
import {AuthService} from "../services/auth.service";

@Component({
    selector: "login-component",
    template: `
    <button *ngIf="!auth.authenticated()" (click)="auth.login()">Login</button>
    <button *ngIf="auth.authenticated()" (click)="auth.logout()">Logout</button>
    `,
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
