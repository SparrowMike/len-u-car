import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import * as yup from "../../../node_modules/yup";
import Textfield from "../editProfile/FormsUI/Textfield";

const useStyles = makeStyles({
  form: {
    marginTop: 20,
  },
  field: {
    marginTop: 10,
  },
});

const validationSchema = yup.object({
  password_unhashed: yup
    .string()
    .min(5, "Password should be of minimum 5 characters length")
    .required("Password is required"),
});

interface FormValues {
  user_id: number | undefined;
  username: string | undefined;
  password_unhashed: string | undefined;
  avatar: string | ArrayBuffer | undefined;
  cloudinary_id: string | undefined;
  full_name: string | undefined;
  email: string | undefined;
  user_type: string | undefined;
  mobile: number | undefined;
  identification_card: string | undefined;
  driving_license: string | undefined;
}

interface CurrentUser {
  user_id: number;
  username: string;
  password: string;
  full_name: string;
  email: string;
  avatar: string;
  user_type: string;
  mobile: number;
  identification_card: string;
  driving_license: string;
  cloudinary_id: string;
}

const ChangePassword: React.FC = () => {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState<CurrentUser>();
  const [initialValues, setinitialValues] = useState<FormValues>({
    user_id: undefined,
    username: undefined,
    password_unhashed: undefined,
    avatar: undefined,
    cloudinary_id: undefined,
    full_name: undefined,
    email: undefined,
    user_type: undefined,
    mobile: undefined,
    identification_card: undefined,
    driving_license: undefined,
  });

  useEffect(() => {
    const fetchSession = async () => {
      // retrieve session ID from custom cookie
      const sidfromCookie = Cookies.get("cook");
      const res = await fetch(`/sessions/check/${sidfromCookie}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      const currentUserInfo = data.sessionDetails.currentUser;
      setCurrentUser(currentUserInfo);
      setinitialValues({
        user_id: currentUser?.user_id,
        username: currentUser?.username,
        password_unhashed: currentUser?.password,
        avatar: currentUser?.avatar,
        cloudinary_id: currentUser?.cloudinary_id,
        full_name: currentUser?.full_name,
        email: currentUser?.email,
        user_type: currentUser?.user_type,
        mobile: currentUser?.mobile,
        identification_card: currentUser?.identification_card,
        driving_license: currentUser?.driving_license,
      });
    };
    fetchSession();
    // eslint-disable-next-line
  }, [currentUser?.username, initialValues?.user_id]);

  const handleSubmit = (formValue: FormValues) => {
    let merge = { ...initialValues };
    merge.password_unhashed = formValue.password_unhashed;
    const updateUserAccount = async () => {
      try {
        const res = await fetch("/users/" + currentUser?.user_id, {
          method: "PUT",
          body: JSON.stringify(merge),
          headers: {
            "Content-Type": "application/json",
          },
        });
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
        initialValues={{ ...initialValues }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <Textfield
              className={classes.field}
              id="password"
              name="password_unhashed"
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
