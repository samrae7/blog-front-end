import Button from "@material-ui/core/Button";
import * as React from "react";
import AuthService from "../services/AuthService";

interface ILoginControlProps {
  authService: AuthService;
}

const LoginControl: React.StatelessComponent<ILoginControlProps> = (props: ILoginControlProps): JSX.Element => {
  return (
    <Button color="inherit" onClick={props.authService.login}>
      Login
    </Button>
  );
};

export default LoginControl;
