import classNames from "classnames";
import * as React from "react";
import { Link, LinkProps } from "react-router-dom";

// MATERIAL-UI IMPORTS
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/Inbox";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    appFrame: {
      zIndex: 1,
      overflow: "hidden",
      position: "relative",
      display: "flex",
      width: "100%"
    },
    appBar: {
      position: "absolute",
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 20
    },
    hide: {
      display: "none"
    },
    drawerPaper: {
      position: "relative",
      width: drawerWidth
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3,
      marginLeft: -drawerWidth,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    contentShift: {
      marginLeft: 0,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    grow: {
      flexGrow: 1
    },
    titleLink: {
      textDecoration: "none",
      "&:hover": {
        color: "inherit"
      },
      "&:visited": {
        color: "inherit"
      }
    }
  });

interface IDrawerState {
  open: boolean;
}

interface IDrawerProps extends WithStyles<typeof styles> {
    renderLoginControl: () => JSX.Element;
}

class MenuSystem extends React.Component<
  IDrawerProps,
  IDrawerState
> {
  public state = {
    open: false
  };

  public handleDrawerToggle = (): void => {
    this.setState((state: IDrawerState) => ({ open: !state.open }));
  };

  public render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    const LinkAllPosts = (props: LinkProps) => <Link to="/posts" {...props} />;

    const drawer = (
      <Drawer
        variant="persistent"
        anchor={"left"}
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerToggle}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem component={LinkAllPosts}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="All posts" />
          </ListItem>
          <Divider />
        </List>
      </Drawer>
    );

    return (
      <div className={classes.appFrame}>
        <AppBar
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          {/* disableGutters={!open} */}
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              className={classes.grow}
              color="inherit"
              noWrap={true}
            >
              <a className={classes.titleLink} href="/posts">
                Sam's blog
              </a>
            </Typography>
            <Button variant="contained" href="/new">
              Add post
            </Button>
            {this.props.renderLoginControl()}
          </Toolbar>
        </AppBar>
        {drawer}
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MenuSystem);
