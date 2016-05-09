import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class JobsService {
  constructor(private http: Http, private authHttp: AuthHttp) {}

  private url = 'api/home/check';

  getApiResponse(): Observable<any> {
    return this.authHttp.get(this.url).map((res: Response) => res.json()).catch(this.handleError);
  }

  private handleError(error: Error) {
    // in a real world app, we may send the error to some remote logging
    // infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.message || 'Server error');
  }
}
