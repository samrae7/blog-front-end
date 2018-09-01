import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MenuSystem from './components/MenuSystem';
import { BrowserRouter, Route } from 'react-router-dom';
import { PostsList } from './components/PostsList';

const App: React.StatelessComponent = (): JSX.Element => {
  return (
    <div>
      <MenuSystem>
        <Route path='/posts' component={PostsList} />
      </MenuSystem>
    </div>
  );
}

var el = document.querySelector('#app');

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), el);