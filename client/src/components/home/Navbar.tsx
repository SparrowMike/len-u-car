import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
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
  })
);

export default function Navbar() {
  const classes = useStyles();

  return (
    <AppBar color="inherit" elevation={2}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          LenUCar
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
      </Toolbar>
    </AppBar>
  );
}
