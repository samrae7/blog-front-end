import React from "react";
import Button from '@material-ui/core/Button';

class PostsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}] };
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
        {this.state.posts.map((p, i) => 
            <div key={i}>
              {p.title}
            </div>)
        }
      </div>
    );
  }
}

export {
  PostsList
}