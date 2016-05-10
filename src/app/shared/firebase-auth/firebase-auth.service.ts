import { Injectable } from '@angular/core';
import { AuthProviders, FirebaseAuth, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class FirebaseAuthService {
  private authState: FirebaseAuthData | FirebaseAuthState;

  constructor(public auth$: FirebaseAuth) {
    this.authState = auth$.getAuth();

    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null && !this.expired;
  }

  get expired(): boolean {
    return !this.authState || (this.authState.expires * 1000) < Date.now();
  }

  get id(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  signInWithCustom(token: Auth0DelegationToken): Promise<FirebaseAuthState> {
    console.log('attempting firebase login with', token);
    return this.auth$.login({
      provider: AuthProviders.Custom
    });
  }

  signInWithGithub(): Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Github
    });
  }

  signInWithGoogle(): Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Google
    });
  }

  signInWithTwitter(): Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Twitter
    });
  }

  signOut(): void {
    this.auth$.logout();
  }
}