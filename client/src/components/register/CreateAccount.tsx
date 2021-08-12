import { makeStyles } from "@material-ui/core";
import Button from "../editProfile/FormsUI/Button";
import { Container } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Formik, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Textfield from "../editProfile/FormsUI/Textfield";

const useStyles = makeStyles({
  field: {
    marginTop: 10,
  },
  footer: {
    marginTop: 40,
    paddingBottom: 40,
  },
  submitBtn: {
    marginTop: 20,
  },
});

interface FormValues {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
  full_name: string;
}

const initialValues: FormValues = {
  username: "",
  password: "",
  passwordConfirm: "",
  email: "",
  full_name: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().min(5, "Username is too short").required("Required"),
  // .test(
  //   "username-backend-validation",
  //   "Username is taken",
  //   async (username) => {
  //     const {
  //       data: { success },
  //     } = await axios.post("http://localhost:4000/users/checkusers", {
  //       username: username,
  //     });
  //     return success;
  //   }
  // ),
  password: Yup.string().required("Required"),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password")],
    "Password must be the same!"
  ),
  email: Yup.string().lowercase().email("Invalid email.").required("Required"),
  // .test(
  //   "email-backend-validation",
  //   "Email address is taken",
  //   async (email) => {
  //     const {
  //       data: { success },
  //     } = await axios.post("http://localhost:4000/users/checkemail", {
  //       email: email,
  //     });
  //     return success;
  //   }
  // ),
  full_name: Yup.string().required("Required"),
});

const CreateAccount: React.FC = () => {
  const classes = useStyles();
  const handleSubmit = (values: FormValues): void => {
    alert(JSON.stringify(values));
  };
  return (
    <Container>
      <Typography variant="h4" align="center" style={{ fontWeight: 600 }}>
        Len-U-Car
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ dirty, isValid }) => {
          return (
            <Form>
              <Textfield
                name="username"
                label="Username"
                className={classes.field}
                required
              />
              <Textfield
                name="password"
                label="Password"
                type="password"
                className={classes.field}
                required
              />
              <Textfield
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                className={classes.field}
                required
              />
              <Textfield
                name="email"
                label="Email"
                className={classes.field}
                required
              />
              <Textfield
                name="full_name"
                label="Full Name"
                className={classes.field}
                required
              />
              <div className={classes.submitBtn}>
                <Button>Submit</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default CreateAccount;
