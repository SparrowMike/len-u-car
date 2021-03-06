import { makeStyles, Paper, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Dispatch, SetStateAction } from "react";
import { Link as RouterLink } from "react-router-dom";
import Footer from "../components/home/Footer";
import NewSession from "../components/login/NewSession";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
    paddingTop: "30px",
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(80),
      height: theme.spacing(45),
    },
  },
  footer: {
    textAlign: "center",
    marginTop: theme.spacing(6),
  },
  signup: {
    marginTop: theme.spacing(1),
    textAlign: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

interface IProps {
  setloggedIn: Dispatch<SetStateAction<boolean>>;
  loggedIn: boolean
}

const Login: React.FC<IProps> = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={6}>
          <Paper className={classes.root} elevation={2}>
            <NewSession setloggedIn={props.setloggedIn} loggedIn={props.loggedIn} />
          </Paper>
          <Paper className={classes.signup} elevation={2}>
            <Typography variant="subtitle2">
              New to Len-U-Car?{" "}
              <RouterLink
                to="/register"
                style={{ textDecoration: "none", color: "#d4524d" }}
              >
                Sign up!
              </RouterLink>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
