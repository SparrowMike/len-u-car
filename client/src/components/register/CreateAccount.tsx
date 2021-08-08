import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import Button from "./FormsUI/Button";
import Textfield from "./FormsUI/Textfield";
import React from "react"

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  paper: {
    padding: 35,
  },
  field: {
    marginTop: 10,
  },
  signup: {
    marginTop: theme.spacing(1),
    textAlign: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  form: {
    marginTop: 20,
  },
  disclaimer: {
    marginTop: 40,
    textAlign: "center",
    color: "grey",
  },
}));

const INITIAL_FORM_STATE = {
  username: "",
  password: "",
  fullName: "",
  email: "",
};

const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  fullName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email.").required("Required"),
});

const CreateAccount: React.FC = (props: any) => {
  const classes = useStyles();

  const handleSubmit = (formValue: any) => {
    const createNewAccount = async () => {
      try {
        const res = await fetch("/users", {
          method: "POST",
          body: JSON.stringify(formValue),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        props.registerNewUser(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    createNewAccount();
  };

  return (
    <Container>
      <Grid
        container
        spacing={4}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={8} md={6} lg={6}>
          <Paper className={classes.paper}>
            <div className={classes.formWrapper}>
              <Formik
                initialValues={{
                  ...INITIAL_FORM_STATE,
                }}
                validationSchema={FORM_VALIDATION}
                onSubmit={handleSubmit}
              >
                <Form className={classes.form}>
                  <Textfield
                    name="username"
                    label="Username"
                    className={classes.field}
                  />
                  <Textfield
                    name="password"
                    label="Password"
                    type="password"
                    className={classes.field}
                  />
                  <Textfield
                    name="fullName"
                    label="Full Name"
                    className={classes.field}
                  />
                  <Textfield
                    name="email"
                    label="Email"
                    className={classes.field}
                  />
                  <div className={classes.form}>
                    <Button>
                      <Typography style={{ fontWeight: 700 }}>
                        Submit Form
                      </Typography>
                    </Button>
                  </div>
                  <div className={classes.disclaimer}>
                    <Typography variant="caption">
                      By signing up, you agree to our Terms , Data Policy and
                      Cookies Policy .
                    </Typography>
                  </div>
                </Form>
              </Formik>
            </div>
          </Paper>
          <Paper className={classes.signup} elevation={2}>
            <Typography variant="subtitle2">
              Already have an account?{" "}
              <RouterLink
                to="/"
                style={{ textDecoration: "none", color: "#d4524d" }}
              >
                Sign in
              </RouterLink>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateAccount;
