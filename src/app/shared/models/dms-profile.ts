export interface DmsProfile extends Auth0UserProfile {
  authid_token?: string;
  firebase_token?: Auth0DelegationToken;
  firebase_auth?: any;
}
