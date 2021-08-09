import { useState } from "react";
import clsx from "clsx";
import {
  createStyles,
  makeStyles,
  Theme,
  AppBar,
  Toolbar,
  Typography,
  Link,
  useMediaQuery,
  useTheme,
  Button,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
} from "@material-ui/core";

import ArrowRightAltRoundedIcon from "@material-ui/icons/ArrowRightAltRounded";

import MenuIcon from "@material-ui/icons/Menu";

import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    toolbar: {
      marginTop: 70,
    },
    title: {
      flexGrow: 1,
    },
    temp: {
      marginRight: 40,
    },
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
  })
);

type Anchor = "top";

export default function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileBar, setMobileBar] = useState({ top: false });

  //*==========================FOR MOBILE NAVBAR==============================
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setMobileBar({ ...mobileBar, [anchor]: open });
    };
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button component={RouterLink} to="/">
          <ArrowRightAltRoundedIcon />
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={RouterLink} to="/browse">
          <ArrowRightAltRoundedIcon />
          <ListItemText primary="Browse" />
        </ListItem>
        <ListItem button component={RouterLink} to="/register">
          <ArrowRightAltRoundedIcon />
          <ListItemText primary="Register" />
        </ListItem>
        <ListItem button component={RouterLink} to="/login">
          <ArrowRightAltRoundedIcon />
          <ListItemText primary="Login" />
        </ListItem>
      </List>
    </div>
  );

  //*=========================REGULAR NAVBAR===============================
  return (
    <AppBar color="inherit" elevation={2}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          LenUCar
        </Typography>
        {!isMobile ? (
          <>
            <Typography className={classes.temp}>
              <Link
                component={RouterLink}
                color="inherit"
                to="/"
                style={{ textDecoration: "none" }}
              >
                Home
              </Link>
            </Typography>
            <Typography className={classes.temp}>
              <Link
                component={RouterLink}
                color="inherit"
                to="/browse"
                style={{ textDecoration: "none" }}
              >
                Browse
              </Link>
            </Typography>
            <Typography className={classes.temp}>
              <Link
                component={RouterLink}
                color="inherit"
                to="/register"
                style={{ textDecoration: "none" }}
              >
                Register
              </Link>
            </Typography>
            <Typography className={classes.temp}>
              <Link
                component={RouterLink}
                color="inherit"
                to="/login"
                style={{ textDecoration: "none" }}
              >
                Login
              </Link>
            </Typography>
          </>
        ) : (
          <>
            <Button>
              <MenuIcon onClick={toggleDrawer("top", true)} />
            </Button>
            <SwipeableDrawer
              anchor="top"
              open={mobileBar["top"]}
              onClose={toggleDrawer("top", false)}
              onOpen={toggleDrawer("top", true)}
            >
              {list("top")}
            </SwipeableDrawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
