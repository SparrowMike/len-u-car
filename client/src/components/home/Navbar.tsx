import { useState, KeyboardEvent, MouseEvent, Dispatch, SetStateAction, useEffect } from "react";
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
import MenuIcon from "@material-ui/icons/Menu";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { CollectionsBookmarkOutlined } from "@material-ui/icons";


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
    logo: {
      marginRight: 30,
      marginTop: 10,
    },
    fullList: {
      width: "auto",
    },
  })
);


interface IProps {
  setloggedIn: Dispatch<SetStateAction<boolean>>;
  loggedIn: boolean
}

const Navbar: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileBar, setMobileBar] = useState({ top: false });
  const history = useHistory();

  const logoutSession = () => {                       // +
    // retrieve session ID from custom cookie
    const sidfromCookie = Cookies.get("cook");
    if (sidfromCookie === undefined) console.log("No cookie available."); // +
    console.log("Session Id from Cookie: ", sidfromCookie);

    console.log("logging out....")
    const deleteLogin = async () => {
      const res = await fetch(`/sessions/${sidfromCookie}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log("session deleted", data);
    };
    deleteLogin();

    props.setloggedIn( false )
    Cookies.remove('cook')
    history.push("/");
    console.log("loggedIn status after logging out: ", props.loggedIn ) 
  }

  //*==========================FOR MOBILE NAVBAR==============================
  const toggleDrawer =
    (anchor: string, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setMobileBar({ ...mobileBar, [anchor]: open });
    };
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const list = (anchor: string) => {
    
    return (
      <div
        className= {clsx(classes.list, {
          [classes.fullList]: anchor === "top" || anchor === "bottom",
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          <ListItem button component={RouterLink} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={RouterLink} to="/browse">
            <ListItemText primary="Browse" />
          </ListItem>
          <ListItem button component={RouterLink} to="/register">
            <ListItemText primary="Register" />
          </ListItem>
            {props.loggedIn ? (
              <ListItem 
                button component={RouterLink} 
                to="/logout"
                onClick={logoutSession} >
                <ListItemText primary="Logout" />
              </ListItem>
            ) : (
              <ListItem button component={RouterLink} to="/login">
                <ListItemText primary="Login" />
              </ListItem>
            )}
          <ListItem button component={RouterLink} to="/editprofile">
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </div>
    )
  }

  //*=========================REGULAR NAVBAR===============================
  return (
    <AppBar color="inherit" elevation={2}>
      <Toolbar>
        {!isMobile ? (
          <>
            <Typography variant="h6" className={classes.title}>
              <Link
                component={RouterLink}
                color="inherit"
                to="/"
                style={{ textDecoration: "none" }}
              >
                <img
                  src="https://i.ibb.co/MsPChWS/lenucar.png"
                  height="35"
                  className={classes.logo}
                  alt="logo"
                />
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
            {
              props.loggedIn ? (
                <Typography className={classes.temp}>
                  <Link
                    component={RouterLink}
                    color="inherit"
                    to="/logout"
                    style={{ textDecoration: "none" }}
                    onClick={logoutSession}
                  >
                    Logout
                  </Link>
                </Typography>
              ) : (
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
              )
            }
            <Typography className={classes.temp}>
              <Link
                component={RouterLink}
                color="inherit"
                to="/editprofile"
                style={{ textDecoration: "none" }}
              >
                Profile
              </Link>
            </Typography>
          </>
        ) : (
          <>
            <Button onClick={toggleDrawer("top", true)}>
              <MenuIcon />
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


export default Navbar
