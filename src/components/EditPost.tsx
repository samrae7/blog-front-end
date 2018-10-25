import { createStyles, withStyles } from "@material-ui/core/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as React from "react";
import { IPost } from "../types";
import ImageSelect from "./ImageSelect";
import ImageUpload from "./ImageUpload";

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
      margin: theme.spacing.unit,
      display: "block"
    },
    imageControls: {
      display: "flex"
    }
  });

interface IPostProps extends WithStyles<typeof styles> {
  post: IPost;
}

// TODO correct interface
interface IEditPostState {
  imageKeys: string[];
  selectedImageKey: string;
  [key: string]: string | string[];
}

class EditPost extends React.Component<IPostProps, IEditPostState> {
  constructor(props: IPostProps) {
    super(props);
    this.state = {
      title: "",
      body: "",
      imageKeys: [],
      selectedImageKey: this.props.post.imageId
    };
  }

  public componentDidMount() {
    if (this.props.post) {
      this.setState({
        title: this.props.post.title,
        body: this.props.post.body
      });
    }
    this.getImageKeys();
  }

  public async getImageKeys() {
    const response = await fetch("http://localhost:5000/api/s3upload", {
      method: "GET"
    });
    const data = await response.json();
    const imageKeys = this.getKeysFromS3Response(data);
    this.setState({
      imageKeys
    });
    return imageKeys;
  }

  public handleChange = (propName: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({
      [propName]: event.target.value
    });
  };

  public handleImageSelect = (selectedImageKey: string) => {
    this.setState({
      selectedImageKey
    });
  };

  public handleSave = (e: React.MouseEvent<HTMLElement>) => {
    if (this.props.post) {
      this.updatePost(
        {
          Title: this.state.title,
          Body: this.state.body,
          ImageId: this.state.selectedImageKey
        },
        this.props.post.id
      );
    } else {
      this.createPost({
        Title: this.state.title,
        Body: this.state.body,
        ImageId: this.state.selectedImageKey
      });
    }
  };

  // TODO fix 'any'
  public async updatePost(payload: any, id: number) {
    const fetchOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    };
    return await fetch(`http://localhost:5000/api/post/${id}`, fetchOptions);
  }

  public async createPost(payload: any) {
    const fetchOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    };
    return fetch("http://localhost:5000/api/post", fetchOptions)
      .then(res => console.log("success", res.json()))
      .catch(err => console.log(err));
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
          // defaultValue={this.props.post.title}
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
        <div className={classes.imageControls}>
          <ImageSelect
            selectedImageKey={this.state.selectedImageKey}
            onImageSelect={this.handleImageSelect}
            imageKeys={this.state.imageKeys}
          />
          <ImageUpload postId={this.props.post.id} />
        </div>
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

  private getKeysFromS3Response(data: any): string[] {
    const { s3Objects } = data;
    return s3Objects.map((s3Object: any) => {
      return s3Object.key;
    });
  }
}

export default withStyles(styles)(EditPost);
