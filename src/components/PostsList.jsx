import * as React from "react";
import PostCard from './PostCard';

class PostsList extends React.Component {
  render() {
    return (
      <div>
        {this.props.posts.map((post, i) => 
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