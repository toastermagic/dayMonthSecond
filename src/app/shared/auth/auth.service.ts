import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {tokenNotExpired} from 'angular2-jwt';
import {Observable, Subject, Subscriber, BehaviorSubject} from 'rxjs';
import {AuthProviders, AuthMethods, FirebaseAuthState, AngularFire} from 'angularfire2';

const Auth0Lock: any = require('auth0-lock');

@Injectable()
export class AuthService {
  lock = new Auth0Lock(AUTH0_CLIENTID, AUTH0_DOMAIN);
  refreshSubscription: any;
  zoneImpl: NgZone;

  userSource = new BehaviorSubject<dmsProfile>(null);

  userChange$ = this.userSource.asObservable();

  constructor(zone: NgZone, private router: Router, private af: AngularFire) {
    this.zoneImpl = zone;
    var localProfile = localStorage.getItem('profile');

    if (localProfile == null) {
      console.log('No local user profile');
      return;
    }

    let user = JSON.parse(localStorage.getItem('profile'));
    this.userSource.next(user);

    console.log(`Found local user profile for ${user.nickname}`);
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    return tokenNotExpired();
  }

  get user(): dmsProfile {
    return this.userSource.getValue();
  }

  public login() {
    this.lock.show({
      disableSignupAction: true
    }, (err: Auth0Error, profile: dmsProfile, auth0token: string) => {
      localStorage.setItem('id_token', auth0token);

      if (!err) {
        this
          .getProfile(auth0token)
          .flatMap((prof) => {
            return this.getDelegationToken(prof);
          })
          .flatMap((prof) => {
            return this.firebaseLogin(prof);
          })
          .subscribe(
          (prof: dmsProfile) => {
            console.log('profile returned', prof);
            localStorage.setItem('profile', JSON.stringify(prof));
            this.userSource.next(prof);
          },
          (error: any) => this.loginFail(error),
          () => { console.log('login complete'); });
      }
    });
  }

  private loginFail(error: any) {
    console.log(`login failure ${error}`);
    this.logout();
  }

  private getProfile(token: string): Observable<dmsProfile> {
    return new Observable<dmsProfile>((sub: Subscriber<dmsProfile>) => {
      this.lock.getProfile(token, (err: Auth0Error, profile: dmsProfile) => {
        if (err || !profile) {
          sub.error(`auth0 could not get profile: ${err}`);
        }
        profile.authid_token = token;
        sub.next(profile);
      });
    });
  }

  private getDelegationToken(profile: dmsProfile): Observable<dmsProfile> {
    return new Observable<dmsProfile>((sub: Subscriber<dmsProfile>) => {
      this.lock.getClient().getDelegationToken({
        target: '0DkTCPKzFbJPEow18W1eT2yzT3VtJJTw',
        id_token: profile.authid_token,
        api_type: 'firebase'
      },
        (fbErr: Auth0Error, fbToken: Auth0DelegationToken) => {
          if (fbErr) {
            sub.error(`Could not get delegation token from auth0: ${fbErr}`)
          }
          profile.firebase_token = fbToken;
          sub.next(profile);
        });
    });
  };

  private firebaseLogin(profile: dmsProfile): Observable<dmsProfile> {
    return new Observable<dmsProfile>((sub: Subscriber<dmsProfile>) => {
      this.af.auth.login({ token: profile.firebase_token.id_token },
        {
          provider: AuthProviders.Custom,
          method: AuthMethods.CustomToken
        }).then(
        (state: FirebaseAuthState) => {
          profile.firebase_auth = state;
          sub.next(profile);
        },
        (err: Error) => {
          sub.error(`firebaseLogin ${err}`);
        });
    });
  }

  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userSource.next(null);
    this.af.auth.logout();
    this.router.navigate(['/home']);
  }
}
