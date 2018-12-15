import auth0 from "auth0-js";
import history from "../history";

export default class AuthService {
  private auth0: auth0.WebAuth;
  private accessToken: string;
  private idToken: string;
  private expiresAt: number;

  constructor() {
    this.login = this.login.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.auth0 = new auth0.WebAuth({
      domain: "samsblog.eu.auth0.com",
      clientID: "L2s3AmsQaBPlOKcn5nHnhQ170JvFwy8K",
      redirectUri: "http://localhost:8000/callback",
      responseType: "token id_token",
      scope: "openid"
    });
  }

  public login = () => {
    this.auth0.authorize();
  };

  public handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace("/posts");
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  };

  private setSession(authResult: auth0.Auth0DecodedHash) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem("isLoggedIn", "true");

    // Set the time that the access token will expire at
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    // navigate to the home route
    history.replace("/posts");
  }
}
