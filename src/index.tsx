import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MenuSystem from './components/MenuSystem';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PostsList } from './components/PostsList';
import Post from './components/Post'

class App extends React.Component<{}, any> {
  constructor(props: {}) {
    super(props);
    this.state = { posts: [] };
  }

  componentDidMount() {
    this.getPosts();
  }

  async getPosts() {
    const response = await fetch("http://localhost:5000/api/post", {
      method: "GET"
    });
    const data = await response.json();
    this.setState({
      posts: data
    });
    return data;
  }

  render() {
    return (
      <div>
        <MenuSystem>
          <Switch>
            <Route exact path="/posts" render={() => <PostsList posts={this.state.posts} />} />
            <Route path="/posts/:id" render={({match}) => {
              console.log("match", match);
              console.log("match.params", match.params);
              console.log("posts", this.state.posts);  
              console.log("int", parseInt(match.params) - 1);  
              console.log("post", this.state.posts[parseInt(match.params.id)-1]);  
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

var el = document.querySelector('#app');

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), el);