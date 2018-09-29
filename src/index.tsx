import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import MenuSystem from "./components/MenuSystem";
import Post from "./components/Post";
import EditPost from "./components/EditPost";
import { IPost } from "./types";
import { PostsList } from "./components/PostsList";

class App extends React.Component<any, any> {
  constructor(props: any) {
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
            <Route exact={true} path="/posts" render={this.renderPostsList} />
            <Route exact={true} path="/posts/:id" render={this.renderPost} />
            <Route
              exact={true}
              path="/posts/edit/:id"
              render={this.renderEditPost}
            />
            <Route
              exact={true}
              path="/new"
              render={this.renderEditPost}
            />
          </Switch>
        </MenuSystem>
      </div>
    );
  }

  private renderPostsList = () => <PostsList posts={this.state.posts} />;

  private renderPost = (props: RouteComponentProps<IPost>) => {
    const { match } = props;
    return this.state.posts.length ? (
      <Post post={this.state.posts[parseInt(match.params.id, null) - 1]} />
    ) : (
      <div> Not yet</div>
    );
  };

  // TODO DRY out
  // TODO rename render PostForm
  private renderEditPost = (props: RouteComponentProps<IPost>) => {
    const { match } = props;
    return this.state.posts.length ? (
      <EditPost post={this.state.posts[parseInt(match.params.id, null) - 1]} />
    ) : (
      <div> Not yet</div>
    );
  };
}

const el = document.querySelector("#app");

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  el
);
