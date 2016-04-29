import {Component} from "angular2/core";
import {ArbitraryService} from "../services/arbitrary.service";

@Component({
    selector: "home-dash",
    templateUrl: "./app/components/home.component.html",
    providers: [ArbitraryService]
})

export class HomeComponent {

    response: string = "ready...";

    constructor(private _arbitraryService: ArbitraryService) {

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
                (err) => console.log(err, "Failed"),
                () => console.log(`arbitrary thing is done`));
    }
}