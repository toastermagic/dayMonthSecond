import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES, Media, SidenavService} from "ng2-material/all";
import {ArbitraryService} from "../services/arbitrary.service";

@Component({
    selector: "sidenav",
    templateUrl: "./app/components/sidenav.component.html",
    directives: [MATERIAL_DIRECTIVES],
    providers: [SidenavService, ArbitraryService]
})
export class SidenavComponent {
    response: string;
    constructor(public sidenav: SidenavService,
        public media: Media,
        public _arbitraryService: ArbitraryService) {
    }

    hasMedia(breakSize: string): boolean {
        return this.media.hasMedia(breakSize);
    }

    open(name: string) {
        this.sidenav.show(name);
    }

    close(name: string) {
        this.sidenav.hide(name);
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