import { Container, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../editProfile/FormsUI/Button";
import Textfield from "../editProfile/FormsUI/Textfield";
import { useHistory } from "react-router-dom";


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
  password_unhashed: string;
  passwordConfirm: string;
  email: string;
  full_name: string;
}

const initialValues: FormValues = {
  username: "",
  password_unhashed: "",
  passwordConfirm: "",
  email: "",
  full_name: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, "Username is too short")
    .required("Required")
    .test(
      "username-backend-validation",
      "Username is taken",
      async (username) => {
        const msg = await axios.post("http://localhost:4000/users/checkusers", {
          username: username,
        });

        if (msg.data.msg === "Username available.") {
          console.log(msg.data.msg);
          return Promise.resolve(true);
        } else {
          console.log("not ok");
          return Promise.resolve(false);
        }
      }
    ),
  password_unhashed: Yup.string().required("Required"),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password_unhashed")],
    "Password must be the same!"
  ),
  email: Yup.string()
    .lowercase()
    .email("Invalid email.")
    .required("Required")
    .test(
      "email-backend-validation",
      "Email address is taken",
      async (email) => {
        const msg = await axios.post("http://localhost:4000/users/checkemail", {
          email: email,
        });

        if (msg.data.msg === "Email address is available.") {
          console.log(msg.data.msg);
          return Promise.resolve(true);
        } else {
          console.log("not ok");
          return Promise.resolve(false);
        }
      }
    ),
  full_name: Yup.string().required("Required"),
});

const CreateAccount: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = (values: FormValues)=> { 
    const createNewAccount = async () => {
      try {
        const res = await fetch("http://localhost:4000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        console.log(res);
      
      } catch (error) {
        console.error(error.message);
      }
    }
    createNewAccount();
    history.replace("http://localhost:3000/")

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
        validateOnChange={false}
      >
        {({ dirty, isValid }) => {
          return (
            <Form>
              <Textfield
                name="username"
                label="Username"
                className={classes.field}
                validateOnChange={false}
                required
              />
              <Textfield
                name="password_unhashed"
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
