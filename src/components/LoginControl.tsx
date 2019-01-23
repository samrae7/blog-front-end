import Button from "@material-ui/core/Button";
import * as React from "react";

interface ILoginControlProps {
  authService: any;
}

const LoginControl: React.StatelessComponent<ILoginControlProps> = (
  props: ILoginControlProps
): JSX.Element => {
  const {
    authService: { isAuthenticated }
  } = props;
  return isAuthenticated() ? (
    <Button color="inherit" onClick={props.authService.logout}>
      Logout
    </Button>
  ) : (
    <Button color="inherit" onClick={props.authService.login}>
      Login
    </Button>
  );
};

export default LoginControl;
