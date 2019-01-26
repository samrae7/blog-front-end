// src/Callback/Callback.js

import * as React from "react";

class Callback extends React.Component<any, any> {
  public componentWillMount() {
    this.handleAuth();
  }

  public handleAuth = () => {
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.authService.handleAuthentication();
    }
  };

  public render() {
    return (
      <div>
        <img src="../assets/loading.svg" alt="loading" />
      </div>
    );
  }
}

export default Callback;
