import React from "react";
import { Formik } from "formik";
import * as yup from "../../../node_modules/yup";
import Button from "@material-ui/core/Button";
import Textfield from "../editProfile/FormsUI/Textfield";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  form: {
    marginTop: 20,
  },
  field: {
    marginTop: 10,
  },
});

const validationSchema = yup.object({
  username: yup.string().required("Full Name is required"),
  password: yup
    .string()
    .min(5, "Password should be of minimum 5 characters length")
    .required("Password is required"),
});

interface FormValues {
  username: string;
  password: string;
}

const INITIAL_FORM_STATE: FormValues = {
  username: "abc",
  password: "12345",
};

const ChangePassword: React.FC = () => {
  const classes = useStyles();
  const currentUser = "1";

  const handleSubmit = (formValue: FormValues) => {
    // const userImageURL = { image: displayImageUser };
    let merge = { ...formValue };
    console.log(merge);
    const updateUserAccount = async () => {
      try {
        const res = await fetch("http://localhost:4000/users/" + currentUser, {
          method: "PUT",
          body: JSON.stringify(merge),
          headers: {
            "Content-Type": "application/json",
          },
        });
        //  const data = await res.json();
        console.log(res);
        alert("User profile updated succesfully!");
      } catch (error) {
        console.log(error);
      }
    };
    updateUserAccount();
  };

  return (
    <div>
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <Textfield
              className={classes.field}
              id="username"
              name="username"
              label="Username"
              required
            />
            <Textfield
              className={classes.field}
              id="password"
              name="password"
              label="Password"
              required
            />
            <Button
              color="primary"
              variant="contained"
              type="submit"
              style={{ marginTop: 10 }}
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
