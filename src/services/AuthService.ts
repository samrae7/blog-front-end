import auth0 from "auth0-js";

export default class AuthService {
  private auth0 = new auth0.WebAuth({
    domain: "samsblog.eu.auth0.com",
    clientID: "L2s3AmsQaBPlOKcn5nHnhQ170JvFwy8K",
    redirectUri: "http://localhost:8000/callback",
    responseType: "token id_token",
    scope: "openid"
  });

  public login() {
    this.auth0.authorize();
  }
}
