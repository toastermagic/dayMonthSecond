import {Component, OnInit} from "angular2/core";
import {ArbitraryService} from "../services/arbitrary.service";
import {AuthService} from "../services/auth.service";

@Component({
    selector: "arbitrary-component",
    template: `<h1>I am an arbitrary template</h1>
    <button *ngIf="!auth.authenticated()" (click)="auth.login()">Login</button>
    <button *ngIf="auth.authenticated()" (click)="auth.logout()">Logout</button>
    <button (click)="doApiCheck()">api check</button>
    <pre>{{ response }}</pre>`,
    providers: [ArbitraryService, AuthService],
})

export class ArbitraryComponent implements OnInit {

    response: string = "ready...";

    constructor(private _arbitraryService: ArbitraryService, public auth: AuthService) {
        console.log(`arbitrary component constructed`);
    }

    ngOnInit() {
        console.log(`arbitrary component initialised`);
    }

    showMessage(message: string) {
        this.response = message;
    }

    doApiCheck() {
        console.log(`sending arbitrary request`);
        this._arbitraryService
            .getApiResponse()
            .subscribe(
                (res) => this.showMessage(res),
                (err) => console.error(err, "Failed"),
                () => console.log(`arbitrary thing is done`));
    }
}
