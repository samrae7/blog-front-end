import auth0 from "auth0-js";
import history from "../history";
import { randomString } from "../helpers";

class AuthService {
  private accessToken: string;
  private idToken: string;
  private expiresAt: number;
  private requestedScopes: string = "openid profile create:posts";
  private nonce: string;
  private auth0 = new auth0.WebAuth({
    domain: "samsblog.eu.auth0.com",
    clientID: "L2s3AmsQaBPlOKcn5nHnhQ170JvFwy8K",
    redirectUri: "http://localhost:8000/callback",
    responseType: "token id_token",
    scope: "openid create:posts",
    audience: "https://localhost:5000/api/post"
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    // this.requestedScopes: string = 'openid profile read:timesheets create:timesheets';
    this.getAccessToken = this.getAccessToken.bind(this);
    this.setSession = this.setSession.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.renewSession = this.renewSession.bind(this);
  }

  public login() {
    this.nonce = randomString(8);
    this.auth0.authorize({ nonce: this.nonce });
    localStorage.setItem(this.nonce, history.location.pathname);
  }

  public logout() {
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem(this.nonce);
    this.nonce = null;
    history.replace("/posts");
  }

  public handleAuthentication() {
    this.auth0.parseHash({ nonce: this.nonce }, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace("/posts");
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  public getAccessToken() {
    return this.accessToken;
  }

  public isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this.expiresAt;
  }

  public renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(
          `Could not get a new token (${err.error}: ${err.errorDescription}).`
        );
      }
    });
  }

  private setSession(authResult: auth0.Auth0DecodedHash) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem("isLoggedIn", "true");

    // If there is a value on the `scope` param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    const scopes = authResult.scope || this.requestedScopes || "";

    // Set the time that the access token will expire at
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
    // this.scheduleRenewal();

    // get nonce from authResult so that we can check it matches that stored in localstorage
    const { nonce } = authResult.idTokenPayload;

    // if nonce matches navigate to the last path before auth (or if undefined go to posts)
    const redirectPath = localStorage.getItem(nonce) || "/posts";
    history.replace(redirectPath);
  }
}

export default AuthService;
