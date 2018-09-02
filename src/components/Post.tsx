import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { Post } from "../types";

const styles = () =>
  createStyles({
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
  post: Post;
}

const Post: React.StatelessComponent<IPostProps> = (props: IPostProps) => {
  const { classes, post } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          {new Date(post.dateCreated).toDateString()}
        </Typography>
        <Typography variant="headline" component="h2">
          {post.title}
        </Typography>
        <Typography component="p">{post.body}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Read more</Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(Post);
