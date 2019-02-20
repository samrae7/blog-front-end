import * as React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { IPost } from "../types";
import { AWS_BUCKET_BASE_URL } from "../constants";
import { Link } from "react-router-dom";
import AuthAware from "./AuthAware";

import { Theme } from "@material-ui/core/styles/createMuiTheme";
import FourOFour from "./FourOFour";

const styles = (theme: Theme) =>
  createStyles({
    image: {
      maxWidth: 800
    },
    card: {
      minWidth: 275
    },
    title: {
      marginBottom: 16,
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    },
    button: {
      margin: theme.spacing.unit,
      display: "block"
    }
  });

interface IPostProps extends WithStyles<typeof styles> {
  post: IPost;
  isAuthenticated: () => boolean;
  onDeletePost: (id: number) => Promise<void>;
}

const Post: React.StatelessComponent<IPostProps> = (props: IPostProps) => {
  const { classes, post, isAuthenticated, onDeletePost } = props;

  const DeleteButton = () => {
    const handleClick = () => onDeletePost(post.id);
    return (
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClick}
      >
        Delete post
      </Button>
    );
  };

  return post ? (
    <Card className={classes.card}>
      <CardContent>
        {post.imageId && (
          <img
            className={classes.image}
            src={`${AWS_BUCKET_BASE_URL}/${post.imageId}`}
          />
        )}
        <Typography className={classes.title} color="textSecondary">
          {new Date(post.dateCreated).toDateString()}
        </Typography>
        <Typography variant="headline" component="h2">
          {post.title}
        </Typography>
        <Typography component="p">{post.intro}</Typography>
        <Typography component="p">{post.body}</Typography>
        {isAuthenticated() && (
          <Button variant="contained">
            <Link to={`edit/${post.id}`}>Edit post</Link>
          </Button>
        )}
        <AuthAware render={DeleteButton} />
      </CardContent>
    </Card>
  ) : (
    <FourOFour />
  );
};

export default withStyles(styles)(Post);
