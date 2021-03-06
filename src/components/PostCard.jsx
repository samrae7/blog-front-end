import * as React from "react";
import * as PropTypes from "prop-types";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const styles = theme =>
  createStyles({
    card: {
      width: "100%",
      maxWidth: 800,
      minWidth: 275,
      marginBottom: theme.spacing.unit
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)"
    },
    title: {
      marginBottom: 16,
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  });

function PostCard(props) {
  const { classes, post } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          {new Date(post.dateCreated).toDateString()}
        </Typography>
        <Typography variant="h5" component="h2">
          {post.title}
        </Typography>
        <Typography component="p">{post.intro}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link to={`/posts/${post.id}`}>Read more</Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(PostCard);
