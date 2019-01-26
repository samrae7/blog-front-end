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

const styles = () =>
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
    }
  });

interface IPostProps extends WithStyles<typeof styles> {
  post: IPost;
  isAuthenticated: () => boolean;
}

const Post: React.StatelessComponent<IPostProps> = (props: IPostProps) => {
  const { classes, post, isAuthenticated } = props;

  return (
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
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(Post);
