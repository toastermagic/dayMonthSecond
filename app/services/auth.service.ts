import {Injectable, NgZone} from "angular2/core";
import {Router} from "angular2/router";
import {tokenNotExpired} from "angular2-jwt";

// avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  refreshSubscription: any;
  user: Object;
  zoneImpl: NgZone;
  lock = new Auth0Lock("auth0clientId", "auth0domain");

  constructor(zone: NgZone, private router: Router) {
    this.zoneImpl = zone;
    this.user = JSON.parse(localStorage.getItem("profile"));
  }

  public authenticated() {
    // check if there's an unexpired JWT
    return tokenNotExpired();
  }

  public login() {
    // show the Auth0 Lock widget
    this.lock.show({}, (err: Error, profile: any, token: string) => {
      if (err) {
        alert(err);
        return;
      }
      // if authentication is successful, save the items
      // in local storage
      localStorage.setItem("profile", JSON.stringify(profile));
      localStorage.setItem("id_token", token);
      this.zoneImpl.run(() => this.user = profile);
    });
  }

  public logout() {
    localStorage.removeItem("profile");
    localStorage.removeItem("id_token");
    this.zoneImpl.run(() => this.user = null);
    this.router.navigate(["Home"]);
  }
}