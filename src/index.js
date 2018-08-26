import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { PostsList } from './components/postsList';
import { BrowserRouter, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div>
      <nav>
        <Link to="/posts">Posts</Link>
      </nav>
       <Route path='/posts' component={PostsList} />
    </div>
  );
}

var el = document.querySelector('#app');

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), el);