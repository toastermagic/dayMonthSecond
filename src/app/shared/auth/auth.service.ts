import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {tokenNotExpired} from 'angular2-jwt';
import {Observable, Subject, Subscriber, BehaviorSubject} from 'rxjs';
import {AuthProviders, AuthMethods, FirebaseAuthState, AngularFire} from 'angularfire2';
import {DmsProfile} from '../models';

const Auth0Lock: any = require('auth0-lock');

@Injectable()
export class AuthService {
  lock = new Auth0Lock(AUTH0_CLIENTID, AUTH0_DOMAIN);
  refreshSubscription: any;
  zoneImpl: NgZone;

  userSource = new BehaviorSubject<DmsProfile>(null);

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

  get user(): DmsProfile {
    return this.userSource.getValue();
  }

  public signUp() {
    this.lock.showSignup({},
      (err: Auth0Error, profile: DmsProfile, auth0token: string) => {
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
            (prof: DmsProfile) => {
              localStorage.setItem('profile', JSON.stringify(prof));
              this.userSource.next(prof);
            },
            (error: any) => this.loginFail(error),
            () => { console.log('login complete'); });
        }
      });
  }

  public login() {
    this.lock.show({
      disableSignupAction: true
    }, (err: Auth0Error, profile: DmsProfile, auth0token: string) => {
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
          (prof: DmsProfile) => {
            this.userSource.next(prof);
            localStorage.setItem('profile', JSON.stringify(prof));

            //  do this last, setting this id_token causes an immediate update to 'authenticated'
            localStorage.setItem('id_token', auth0token);
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

  private getProfile(token: string): Observable<DmsProfile> {
    return new Observable<DmsProfile>((sub: Subscriber<DmsProfile>) => {
      this.lock.getProfile(token, (err: Auth0Error, profile: DmsProfile) => {
        if (err || !profile) {
          sub.error(`auth0 could not get profile: ${err}`);
        }
        profile.authid_token = token;
        sub.next(profile);
      });
    });
  }

  private getDelegationToken(profile: DmsProfile): Observable<DmsProfile> {
    return new Observable<DmsProfile>((sub: Subscriber<DmsProfile>) => {
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

  private firebaseLogin(profile: DmsProfile): Observable<DmsProfile> {
    return new Observable<DmsProfile>((sub: Subscriber<DmsProfile>) => {
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
