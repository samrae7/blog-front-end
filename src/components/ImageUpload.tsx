import * as React from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { Typography } from "@material-ui/core";
import { pathOr } from "ramda";

const styles = (theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing.unit
    },
    input: {
      display: "none"
    }
  });

interface IImageUploadProps extends WithStyles<typeof styles> {
  // TODO remove postId as not needed anymore
  postId: number;
  // TODO fix any
  onUploadImage: (file: any) => void;
}
interface IImageUploadState {
  filename: string;
}

class ImageUpload extends React.Component<
  IImageUploadProps,
  IImageUploadState
> {
  private fileInput: React.RefObject<HTMLInputElement>;

  constructor(props: IImageUploadProps) {
    super(props);
    this.fileInput = React.createRef();
    this.updateFilename = this.updateFilename.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
    this.state = {
      filename: ""
    };
  }

  public render() {
    const { classes } = this.props;
    return (
      <div>
        <input
          accept="image/*"
          className={classes.input}
          id="image-upload"
          multiple={true}
          type="file"
          ref={this.fileInput}
          onChange={this.updateFilename}
        />
        <Typography>{this.state.filename}</Typography>
        <label htmlFor="image-upload">
          <Button
            variant="contained"
            component="span"
            className={classes.button}
          >
            Select
          </Button>
        </label>
        <Button
          onClick={this.handleUploadClick}
          variant="contained"
          component="span"
          className={classes.button}
        >
          Upload
        </Button>
      </div>
    );
  }

  get file() {
    return pathOr("", ["current", "files", 0], this.fileInput);
  }

  private updateFilename(): void {
    if (this.file.size > 5000000) {
      alert("File size cannot exceed 5MB");
    }
    this.setState({
      filename: pathOr("", ["name"], this.file)
    });
  }

  private handleUploadClick() {
    event.preventDefault();
    this.props.onUploadImage(this.file);
  }
}

export default withStyles(styles)(ImageUpload);
