import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {tokenNotExpired} from 'angular2-jwt';
import {Subject} from 'rxjs/Subject';

const Auth0Lock: any = require('auth0-lock');

@Injectable()
export class AuthService {
  lock = new Auth0Lock(AUTH0_CLIENTID, AUTH0_DOMAIN);
  refreshSubscription: any;
  user: dmsProfile;
  zoneImpl: NgZone;

  userSource = new Subject<dmsProfile>();
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

    this.lock.show({
      disableSignupAction: true
    }, (err: Auth0Error,
      profile: dmsProfile,
      auth0token: string) => {
        this.lock.getProfile(auth0token, (err2: Auth0Error, profile2: dmsProfile) => {
          if (err || !profile2) {
            console.log('auth0 authorisation failed', err);
          }

          this.lock.getClient().getDelegationToken({
            target: '0DkTCPKzFbJPEow18W1eT2yzT3VtJJTw',
            id_token: auth0token,
            api_type: 'firebase' },
            (fbErr: Auth0Error, fbToken: Auth0DelegationToken) => {
              if (fbErr) {
                console.error('Could not get delegation token from auth0', fbErr);
                return;
              }

              profile2.firebase_token = fbToken.id_token;
              localStorage.setItem('profile', JSON.stringify(profile2));
              localStorage.setItem('id_token', auth0token);
              localStorage.setItem('firebase_token', fbToken.id_token);

              this.userSource.next(profile2);
              this.user = profile2;
            });
        });
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
