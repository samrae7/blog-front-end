import { createStyles, withStyles } from "@material-ui/core/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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
    },
    button: {
      margin: theme.spacing.unit
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

  public handleSave = (e: React.MouseEvent<HTMLElement>) => {
    console.log("e", e);
    console.log("post", this.state.body);
    this.updatePost({ Title: this.state.title, Body: this.state.body });
  };

  public async updatePost(payload: any) {
    console.log("posting");
    const fetchOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    };
    return await fetch("http://localhost:5000/api/post/2", fetchOptions);
  }

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
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleSave}
        >
          Save
        </Button>
      </form>
    );
  }
}

// curl -X POST \
//   http://localhost:5000/api/post/2 \
//   -H 'Cache-Control: no-cache' \
//   -H 'Content-Type: application/json' \
//   -H 'Postman-Token: 963f2010-62ae-4a21-a778-4310a63ccb1a' \
//   -d '{
// 	"Title": "Updated titlexxx",
// 	"Body": "fasfsaf asf fasfjddddddd cnn n the cja ck"
// }'

export default withStyles(styles)(Post);