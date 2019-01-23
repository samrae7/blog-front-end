import * as React from "react";

import { Router, Route, Switch, RouteComponentProps } from "react-router-dom";
import MenuSystem from "./components/MenuSystem";
import Post from "./components/Post";
import EditPost from "./components/EditPost";
import { IPost } from "./types";
import { PostsList } from "./components/PostsList";
import { IPostPayload } from "./components/EditPost";
const { API_BASE_URL } = process.env;
import AuthService from "./services/AuthService";
import LoginControl from "./components/LoginControl";
import Callback from "./components/Callback";
import history from "./history";

const authService = new AuthService();

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { posts: [] };
    this.renderLoginControl = this.renderLoginControl.bind(this);
    this.updateOrCreatePost = this.updateOrCreatePost.bind(this);
    this.renderCallback = this.renderCallback.bind(this);
  }

  public componentDidMount() {
    const { renewSession } = authService;

    if (localStorage.getItem("isLoggedIn") === "true") {
      renewSession();
    }

    this.getPosts();
  }

  public async getPosts() {
    const response = await fetch(`${API_BASE_URL}/post`, {
      method: "GET"
    });
    const data = await response.json();
    this.setState({
      posts: data
    });
    return data;
  }

  public renderLoginControl = () => {
    return <LoginControl authService={authService} />;
  };

  public render() {
    return (
      <Router history={history}>
        <MenuSystem renderLoginControl={this.renderLoginControl}>
          <Switch>
            <Route exact={true} path="/posts" render={this.renderPostsList} />
            <Route exact={true} path="/posts/:id" render={this.renderPost} />
            <Route
              exact={true}
              path="/posts/edit/:id"
              render={this.renderEditPost}
            />
            <Route exact={true} path="/new" render={this.renderCreatePost} />
            <Route exact={true} path="/callback" render={this.renderCallback} />
          </Switch>
        </MenuSystem>
      </Router>
    );
  }

  private renderPostsList = () => {
    return <PostsList posts={this.state.posts} />;
  };

  private renderPost = (props: RouteComponentProps<any>) => {
    const { match } = props;
    return this.state.posts.length ? (
      <Post
        post={this.state.posts.find(
          (post: IPost) => post.id === parseInt(match.params.id, 10)
        )}
      />
    ) : (
      <div> Not yet</div>
    );
  };

  // TODO DRY out
  // TODO rename to renderPostForm
  private renderEditPost = (props: RouteComponentProps<{ id: string }>) => {
    const { match } = props;
    return this.state.posts.length ? (
      <EditPost
        onSave={this.handlePostSave}
        post={this.state.posts.find(
          (post: IPost) => post.id === parseInt(match.params.id, 10)
        )}
      />
    ) : (
      <div> Not yet</div>
    );
  };

  private renderCreatePost = (props: RouteComponentProps<{ id: string }>) => {
    return <EditPost onCreate={this.handlePostCreate} post={null} />;
  };

  private renderCallback = (props: RouteComponentProps<{}>) => {
    return <Callback {...props} authService={authService} />;
  };

  private handlePostSave = (postPayload: IPostPayload, postId: number) => {
    const url = `${API_BASE_URL}/post/${postId}`;
    return this.updateOrCreatePost(postPayload, url)
      .then(posts => {
        this.setState({
          posts
        });
      })
      .catch(err => console.log(err));
  };

  private handlePostCreate = (postPayload: IPostPayload) => {
    const url = `${API_BASE_URL}/post`;
    return this.updateOrCreatePost(postPayload, url)
      .then(post => {
        this.setState({
          posts: [...this.state.posts, post]
        });
        return post;
      })
      .catch(err => console.log(err));
  };

  // TODO factor out into an api module
  private async updateOrCreatePost(payload: IPostPayload, url: string) {
    const fetchOptions: RequestInit = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authService.getAccessToken()}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    };
    return fetch(url, fetchOptions).then(res => {
      return res.json();
    });
  }
}

export default App;
