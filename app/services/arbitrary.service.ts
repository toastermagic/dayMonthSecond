import {Injectable} from "angular2/core";
import {Http, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class ArbitraryService {
    constructor(private http: Http, private authHttp: AuthHttp) { }

    private _url = "home/things";

    getApiResponse() : Observable<any> {
        return this.authHttp
            .get(this._url)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}