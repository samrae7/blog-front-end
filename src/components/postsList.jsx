import React from "react";
import PostCard from './PostCard';

class PostsList extends React.Component {
  constructor(props) {
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
        {this.state.posts.map((post, i) => 
            <PostCard post={post} key={i} />
          )
        }
      </div>
    );
  }
}

export {
  PostsList
}