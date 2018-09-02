import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MenuSystem from './components/MenuSystem';
import Post from './components/Post'
import { PostsList } from './components/PostsList';

class App extends React.Component<{}, any> {
  constructor(props: {}) {
    super(props);
    this.state = { posts: [] };
  }

  public componentDidMount() {
    this.getPosts();
  }

  public async getPosts() {
    const response = await fetch("http://localhost:5000/api/post", {
      method: "GET"
    });
    const data = await response.json();
    this.setState({
      posts: data
    });
    return data;
  }

  public render() {
    return (
      <div>
        <MenuSystem>
          <Switch>
            <Route exact={true} path="/posts" render={() => <PostsList posts={this.state.posts} />} />
            <Route path="/posts/:id" render={({match}) => {
              return this.state.posts.length ?
                <Post post={this.state.posts[parseInt(match.params.id)-1]} />
                :
                <div> Not yet</div>
              }}
            />
          </Switch>
        </MenuSystem>
      </div>
    );
  }
}

const el = document.querySelector('#app');

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), el);