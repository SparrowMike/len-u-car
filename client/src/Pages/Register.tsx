import { makeStyles, Paper, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Link as RouterLink } from "react-router-dom";
import Footer from "../components/home/Footer";
import CreateAccount from "../components/register/CreateAccount";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
    paddingBottom: "50px",
    paddingTop: "30px",
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(80),
      height: theme.spacing(60),
    },
  },
  footer: {
    textAlign: "center",
    marginTop: theme.spacing(6),
  },
  disclaimer: {
    marginTop: theme.spacing(1),
    textAlign: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const Register = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={6}>
          <Paper className={classes.root} elevation={2}>
            <CreateAccount />
          </Paper>
          <Paper className={classes.disclaimer} elevation={2}>
            <Typography variant="subtitle2">
              Already have an account?{" "}
              <RouterLink
                to="/login"
                style={{ textDecoration: "none", color: "#d4524d" }}
              >
                Sign in
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

export default Register;
