import { createStyles, withStyles } from "@material-ui/core/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import TextField from "@material-ui/core/TextField";
import * as React from "react";
import { IPost } from "../types";

const styles = (theme: Theme) =>
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
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200
    },
    menu: {
      width: 200
    }
  });

interface IPostProps extends WithStyles<typeof styles> {
  post: IPost;
}

// TODO correct interface
interface IEditPostState {
  [key: string]: string;
}

class Post extends React.Component<IPostProps, IEditPostState> {
  constructor(props: IPostProps) {
    super(props);
    this.state = {
      title: "",
      body: ""
    };
  }

  public componentDidMount() {
    this.setState({
      title: this.props.post.title,
      body: this.props.post.body
    });
  }

  public handleChange = (propName: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({
      [propName]: event.target.value
    });
  };

  public render() {
    const { title, body } = this.state;
    const { classes } = this.props;
    return (
      <form className={classes.container} noValidate={true} autoComplete="off">
        <TextField
          id="full-width"
          label="Title"
          onChange={this.handleChange("title")}
          InputLabelProps={{
            shrink: true
          }}
          fullWidth={true}
          margin="normal"
          value={title}
        />
        <TextField
          id="full-width"
          label="Main text"
          onChange={this.handleChange("body")}
          InputLabelProps={{
            shrink: true
          }}
          fullWidth={true}
          margin="normal"
          value={body}
        />
      </form>
    );
  }
}

export default withStyles(styles)(Post);
