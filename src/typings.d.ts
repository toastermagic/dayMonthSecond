/// <reference path="../typings/browser.d.ts" />

declare var module: {id: string};

declare var AUTH0_CLIENTID: string;
declare var AUTH0_DOMAIN: string;

interface GlobalEnvironment {
  AUTH0_CLIENTID;
  AUTH0_DOMAIN;
}

interface Global extends GlobalEnvironment  {}

interface dmsProfile extends Auth0UserProfile {
  authid_token: string;
  firebase_token: string;
  firebase_auth: any;
}

declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

