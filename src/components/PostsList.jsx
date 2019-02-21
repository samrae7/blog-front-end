import * as React from "react";
import PostCard from "./PostCard";
import { createStyles, withStyles } from "@material-ui/core/styles";

const styles = () =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  });

class PostsList extends React.Component {
  render() {
    return (
      <div className={this.props.classes.container}>
        {this.props.posts.map((post, i) => (
          <PostCard post={post} key={i} />
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(PostsList);
