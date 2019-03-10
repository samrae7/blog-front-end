import * as React from "react";
import Markdown from "markdown-to-jsx";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { IPost } from "../types";
import { Link } from "react-router-dom";
import AuthAware from "./AuthAware";

import { Theme } from "@material-ui/core/styles/createMuiTheme";
import FourOFour from "./FourOFour";
import PostImage from "./PostImage";

const styles = (theme: Theme) =>
  createStyles({
    card: {
      minWidth: 275,
      maxWidth: 800
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

const listItemOverrideStyles = {
  root: {
    display: "list-item"
  }
};

const markdownOptions = {
  overrides: {
    p: {
      component: (props: any) => (
        <Typography variant="body1" paragraph={true} {...props} />
      )
    },
    li: {
      component: (props: any) => {
        const ListItem = ({ classes }: any) => (
          <Typography
            classes={classes}
            variant="body1"
            component="li"
            {...props}
          />
        );
        const ListItemWithStyles = withStyles(listItemOverrideStyles)(ListItem);
        return <ListItemWithStyles />;
      }
    }
  }
};

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
        <PostImage selectedImageKey={post.imageId} />
        <Typography
          color="textSecondary"
          variant="overline"
          gutterBottom={true}
        >
          {new Date(post.dateCreated).toDateString()}
        </Typography>
        <Typography variant="h5" gutterBottom={true}>
          {post.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom={true}>
          {post.intro}
        </Typography>
        <Markdown children={post.body} options={markdownOptions} />
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
