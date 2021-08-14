import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "../../../node_modules/yup";
import {
  makeStyles,
  Button,
  CircularProgress,
  Container,
} from "@material-ui/core";
import Textfield from "../editProfile/FormsUI/Textfield";

const useStyles = makeStyles({
  form: {
    marginTop: 20,
  },
  field: {
    marginTop: 10,
  },
  footer: {
    marginTop: 40,
    paddingBottom: 40,
  },
});

const validationSchema = yup.object({
  full_name: yup.string().required("Full Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  user_type: yup.string().required("User type is required"),
  mobile: yup
    .number()
    .required("Mobile number is required")
    .positive()
    .integer(),
  identification_card: yup
    .string()
    .required("Identification card No. is required"),
  driving_license: yup.string().required("Driving license No. is required"),
});

interface FormValues {
  full_name: string;
  email: string;
  user_type: string;
  mobile: number;
  identification_card: string;
  driving_license: string;
  avatar: string | ArrayBuffer;
}

const INITIAL_FORM_STATE: FormValues = {
  full_name: "abc",
  email: "abc@abc.com",
  user_type: "provider", // maybe can take out
  mobile: 12345678,
  identification_card: "S1234567A",
  driving_license: "S1234567A",
  avatar: "",
};

const UpdateProfile: React.FC = () => {
  const classes = useStyles();
  const [previewSource, setPreviewSource] = useState("");
  const [loading, setLoading] = useState(false);
  const currentUser = "57";

  // on input change, call reader and set preview
  const handleFileInputChange = (e: React.ChangeEvent<any>) => {
    const file = e.target.files[0];
    console.log("file format", file.name);
    const reader: any = new FileReader();
    console.log(reader);
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      console.log("file reader result output:", reader.result);
      setPreviewSource(reader.result);
    };
  };

  const handleSubmit = (formValue: FormValues) => {
    console.log("submit");
    // e.preventDefault();
    if (!previewSource) return;

    const ImageURL = { avatar: previewSource };
    let merge = { ...formValue, ...ImageURL };

    console.log(merge);
    const updateUserAccount = async () => {
      try {
        const res = await fetch(`http://localhost:4000/users/${currentUser}`, {
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
      <div>
        {loading ? (
          <CircularProgress />
        ) : (
          <img
            src={previewSource}
            alt="chose"
            style={{ height: "280px", width: "280px" }}
          />
        )}
        <div>
          <input
            name="avatar"
            type="file"
            id="avatar"
            onChange={handleFileInputChange}
            accept=".jpg,.jpeg,.gif,.png"
          />
        </div>
      </div>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Container>
            <form onSubmit={formik.handleSubmit} className={classes.form}>
              <Textfield
                className={classes.field}
                id="full_name"
                name="full_name"
                label="Full_name"
                required
              />
              <Textfield
                className={classes.field}
                id="email"
                name="email"
                label="Email"
                required
              />
              <Textfield
                className={classes.field}
                id="user_type"
                name="user_type"
                label="User_type"
                required
              />
              <Textfield
                className={classes.field}
                id="mobile"
                name="mobile"
                label="Mobile"
                required
              />

              <Textfield
                className={classes.field}
                id="identification_card"
                name="identification_card"
                label="Identification_card"
                required
              />

              <Textfield
                className={classes.field}
                id="driving_license"
                name="driving_license"
                label="Driving_license"
                required
              />
              <Button
                className={classes.form}
                color="primary"
                variant="contained"
                type="submit"
                style={{ marginTop: 10 }}
              >
                Submit
              </Button>
            </form>
          </Container>
        )}
      </Formik>
    </div>
  );
};

export default UpdateProfile;
