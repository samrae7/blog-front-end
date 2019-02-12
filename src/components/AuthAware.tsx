import * as React from "react";
import authService from "../services/AuthService";

interface IAuthAwareProps {
  render: () => JSX.Element;
}

const AuthAware: React.StatelessComponent<IAuthAwareProps> = (
  props: IAuthAwareProps
): JSX.Element => {
  return authService.isAuthenticated() && props.render();
};

export default AuthAware;
