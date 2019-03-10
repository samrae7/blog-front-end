import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const el = document.querySelector("#app");

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  el
);
