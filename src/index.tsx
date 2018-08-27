import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Drawer from './components/ResponsiveDrawer';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const App = (): any => {
  return (
    <div>
      <Drawer />
    </div>
  );
}

var el = document.querySelector('#app');

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), el);