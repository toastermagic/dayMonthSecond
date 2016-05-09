import {Injectable} from '@angular/core';
import {Headers, Response, RequestOptions, Http} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class ExternalLoginService {
    private url: string = 'api/account/externalLogin';

    constructor(private http: Http) {
    }

    login(providerName: string) {
        let fullUrl = this.url; // + '?provider=' + providerName;
        return this.http.post(fullUrl, 'henry');
    }
    
    private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body.data || { };
  }
  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}