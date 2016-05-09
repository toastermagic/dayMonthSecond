import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {tokenNotExpired} from 'angular2-jwt';
import {Subject} from 'rxjs/Subject';
import {Auth0identity, Auth0profile} from '../models';

const Auth0Lock: any = require('auth0-lock');

@Injectable()
export class AuthService {
  lock = new Auth0Lock(AUTH0_CLIENTID, AUTH0_DOMAIN);
  refreshSubscription: any;
  user: Auth0profile;
  zoneImpl: NgZone;

  userSource = new Subject<Auth0profile>();
  userChange$ = this.userSource.asObservable();

  constructor(zone: NgZone, private router: Router) {
    this.zoneImpl = zone;
    var localProfile = localStorage.getItem('profile');

    if (localProfile == null) {
      console.log('No local user profile');
      return;
    }
    this.user = JSON.parse(localStorage.getItem('profile'));
    this.userSource.next(this.user);

    console.log(`Found local user profile for ${this.user}`);
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    return tokenNotExpired();
  }

  public login() {
    // Show the Auth0 Lock widget
    this.lock.show({
      disableSignupAction: true
    }, (err, profile, token) => {
      if (err) {
        alert(err);
        return;
      }
      // If authentication is successful, save the items
      // in local storage
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', token);

      this.userSource.next(profile);
      this.user = profile;
    });
  }

  public logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this.userSource.next(null);
    this.user = null;
    // this.router.navigate(['/']);
  }
}
