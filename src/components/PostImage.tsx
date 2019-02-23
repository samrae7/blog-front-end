import * as React from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";

import { AWS_BUCKET_BASE_URL } from "../constants";

const styles = () =>
  createStyles({
    image: {
      width: "100%"
    }
  });

interface IPostImageProps extends WithStyles<typeof styles> {
  selectedImageKey: string;
}

const PostImage: React.StatelessComponent<IPostImageProps> = (
  props: IPostImageProps
) => {
  const { selectedImageKey, classes } = props;
  return (
    selectedImageKey && (
      <img
        className={classes.image}
        src={`${AWS_BUCKET_BASE_URL}/${selectedImageKey}`}
      />
    )
  );
};

export default withStyles(styles)(PostImage);
