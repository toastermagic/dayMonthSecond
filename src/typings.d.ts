/// <reference path="../typings/browser.d.ts" />

// this is for webpack.DefinePlugin
declare var AUTH0_CLIENTID: string;
declare var AUTH0_DOMAIN: string;

interface GlobalEnvironment {
  AUTH0_CLIENTID;
  AUTH0_DOMAIN;
}

interface Global extends GlobalEnvironment  {}

interface dmsProfile extends Auth0UserProfile {
  authid_token?: string;
  firebase_token?: Auth0DelegationToken;
  firebase_auth?: any;
}
