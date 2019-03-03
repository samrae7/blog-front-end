import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import ImageSelect from "./ImageSelect";
import ImageUpload from "./ImageUpload";
import PostImage from "./PostImage";
import { IPost } from "../types";
import { CardContent, Card } from "@material-ui/core";
const API_BASE_URL = process.env.API_BASE_URL;

const styles = (theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 800
    },
    container: {
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
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
  onSave?: (postPayload: IPostPayload, postId: number) => Promise<void>;
  onCreate?: (postPayload: IPostPayload) => Promise<IPost>;
}

interface IEditPostState {
  imageKeys: string[];
  selectedImageKey: string;
  fireRedirect: boolean;
  title: string;
  body: string;
  createdPostId: string;
}

// TODO find out if capitalisation is necessary
export interface IPostPayload {
  Title: string;
  Body: string;
  ImageId: string;
}

class EditPost extends React.Component<IPostProps, IEditPostState> {
  constructor(props: IPostProps) {
    super(props);
    this.state = {
      title: "",
      body: "",
      imageKeys: [],
      selectedImageKey: null,
      fireRedirect: false,
      createdPostId: ""
    };
    this.uploadImage = this.uploadImage.bind(this);
  }

  public componentDidMount() {
    if (this.props.post) {
      this.setState({
        title: this.props.post.title,
        body: this.props.post.body,
        selectedImageKey: this.props.post.imageId || null
      });
    }
    this.getImageKeys();
  }

  public async getImageKeys() {
    const response = await fetch(`${API_BASE_URL}/s3upload`, {
      method: "GET"
    });
    const data = await response.json();
    const imageKeys = this.getKeysFromS3Response(data);
    this.setState({
      imageKeys
    });
    return imageKeys;
  }

  public handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value
    });
  };

  public handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      body: event.target.value
    });
  };

  public handleImageSelect = (selectedImageKey: string) => {
    this.setState({
      selectedImageKey
    });
  };

  public handleSave = () => {
    const postId = this.props.post ? this.props.post.id : null;
    if (postId) {
      this.props.onSave(this.postPayload, postId).then(() =>
        this.setState({
          fireRedirect: true
        })
      );
    } else {
      this.props.onCreate(this.postPayload).then(post =>
        this.setState({
          createdPostId: post.id.toString(),
          fireRedirect: true
        })
      );
    }
  };

  get postPayload(): IPostPayload {
    return {
      Title: this.state.title,
      Body: this.state.body,
      ImageId: this.state.selectedImageKey
    };
  }

  public render() {
    const { title, body, selectedImageKey, fireRedirect } = this.state;
    const { classes, post } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <PostImage selectedImageKey={selectedImageKey} />
          <form
            className={classes.container}
            noValidate={true}
            autoComplete="off"
          >
            <TextField
              id="full-width"
              label="Title"
              onChange={this.handleTitleChange}
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
              onChange={this.handleBodyChange}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth={true}
              multiline={true}
              margin="normal"
              value={body}
            />
            <div className={classes.imageControls}>
              <ImageSelect
                selectedImageKey={this.state.selectedImageKey}
                onImageSelect={this.handleImageSelect}
                imageKeys={this.state.imageKeys}
              />
              <ImageUpload onUploadImage={this.uploadImage} />
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
          {post ? <Link to={`/posts/${post.id}`}>View post</Link> : null}
          {fireRedirect && (
            <Redirect
              to={
                post
                  ? `/posts/${post.id}`
                  : `/posts/${this.state.createdPostId}`
              }
            />
          )}
        </CardContent>
      </Card>
    );
  }

  private uploadImage(file: any) {
    const fetchOptions: RequestInit = {
      method: "POST",
      body: file,
      headers: {
        "Content-Type": "application/octet-stream",
        filename: file.name
      }
    };
    return fetch(`${API_BASE_URL}/s3Upload`, fetchOptions)
      .then(res => res.text())
      .then(key => {
        this.setState({
          imageKeys: [...this.state.imageKeys, key],
          selectedImageKey: key
        });
      })
      .catch(err => console.log(err));
  }

  private getKeysFromS3Response(data: any): string[] {
    const { s3Objects } = data;
    return s3Objects.map((s3Object: any) => {
      return s3Object.key;
    });
  }
}

export default withStyles(styles)(EditPost);
