import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  BrowserRouter,
  Route,
  Switch,
  RouteComponentProps
} from "react-router-dom";
import MenuSystem from "./components/MenuSystem";
import Post from "./components/Post";
import EditPost from "./components/EditPost";
import { IPost } from "./types";
import { PostsList } from "./components/PostsList.jsx";
import { IPostPayload } from "./components/EditPost";
import { API_BASE_URL } from "./constants";

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { posts: [] };
  }

  public componentDidMount() {
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
            <Route exact={true} path="/new" render={this.renderCreatePost} />
          </Switch>
        </MenuSystem>
      </div>
    );
  }

  private renderPostsList = () => <PostsList posts={this.state.posts} />;

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
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    };
    return fetch(url, fetchOptions).then(res => {
      // TODO use Location header to redirect
      console.log(res.headers.get("Location"));
      return res.json();
    });
  }
}

const el = document.querySelector("#app");

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  el
);
