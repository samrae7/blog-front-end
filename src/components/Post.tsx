import * as React from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { IPost } from "../types";

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
}

const Post: React.StatelessComponent<IPostProps> = (props: IPostProps) => {
  const { classes, post } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <img
          className={classes.image}
          src={`https://s3.eu-west-2.amazonaws.com/secret-london-blog/${
            post.imageId
          }`}
        />
        <Typography className={classes.title} color="textSecondary">
          {new Date(post.dateCreated).toDateString()}
        </Typography>
        <Typography variant="headline" component="h2">
          {post.title}
        </Typography>
        <Typography component="p">{post.intro}</Typography>
        <Typography component="p">{post.body}</Typography>
        <Button variant="contained" href={`edit/${post.id}`}>
          Edit post
        </Button>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(Post);
