import * as React from "react";
import PostCard from "./PostCard";

const PostsList = ({ posts }) =>
  posts.map((post, i) => <PostCard post={post} key={i} />);

export default PostsList;
