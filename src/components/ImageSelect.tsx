import * as React from "react";

import { createStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { WithStyles } from "@material-ui/core/styles/withStyles";

const styles = (theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2
    }
  });

interface IImageSelectProps extends WithStyles<typeof styles> {
  selectedImageKey: string;
  imageKeys: string[];
  onImageSelect: (imageKey: string) => void;
}

class ImageSelect extends React.Component<IImageSelectProps, null> {
  public render() {
    const { classes, imageKeys } = this.props;

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="image-select">Image</InputLabel>
        <Select
          value={this.props.selectedImageKey || ""}
          onChange={this.handleChange}
          inputProps={{
            name: "image",
            id: "image-select"
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {imageKeys.map(key => {
            return (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
  private handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onImageSelect(event.target.value);
  };
}

export default withStyles(styles)(ImageSelect);
