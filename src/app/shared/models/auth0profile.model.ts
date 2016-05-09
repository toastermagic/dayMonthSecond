import {Auth0identity} from './auth0identity.model';

export class Auth0profile {
  public email: string;
  public email_verified: boolean;
  public clientID: string;
  public updated_at: Date;
  public picture: string;
  public user_id: string;
  public name: string;
  public given_name: string;
  public family_name: string;
  public locale: string;
  public nickname: string;
  public created_at: Date;
  public global_client_id: string;

  public identities: Auth0identity[];
}
