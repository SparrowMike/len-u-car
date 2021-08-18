import React, { useState, useEffect } from "react";
import { Field, Formik } from "formik";
import * as yup from "../../../node_modules/yup";
import {
  makeStyles,
  Button,
  CircularProgress,
  Container,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import Textfield from "../editProfile/FormsUI/Textfield";
import Cookies from "js-cookie";
import { DropzoneArea } from "material-ui-dropzone";

const useStyles = makeStyles({
  form: {
    marginTop: 20,
  },
  field: {
    marginTop: 10,
  },
});

//* Variables
let types_of_users: Array<string> = ["consumer", "provider"];

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
  user_id: number | undefined;
  username: string | undefined;
  password: string | undefined;
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

const UpdateProfile: React.FC = () => {
  const classes = useStyles();
  const [previewSource, setPreviewSource] = useState("");
  const [image, setImage] = useState<any>();
  const [currentUser, setCurrentUser] = useState<CurrentUser>();
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValues, setinitialValues] = useState<FormValues>({
    user_id: undefined,
    username: undefined,
    password: undefined,
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
    setLoading(true);

    const fetchSession = async () => {
      // retrieve session ID from custom cookie
      const sidfromCookie = Cookies.get("cook");
      if (sidfromCookie === undefined) console.log("No cookie available."); // +
      console.log("Session Id from Cookie: ", sidfromCookie);

      const res = await fetch(`/sessions/check/${sidfromCookie}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("res: ", res);

      const data = await res.json();

      console.log("check useEffect server response", data.sessionDetails);
      const currentUserInfo = data.sessionDetails.currentUser;
      console.log("currentUser Data from Redis:", currentUserInfo);

      setCurrentUser(currentUserInfo);
      console.log(currentUser);

      setinitialValues({
        user_id: currentUser?.user_id,
        username: currentUser?.username,
        password: currentUser?.password,
        avatar: currentUser?.avatar,
        cloudinary_id: currentUser?.cloudinary_id || "",
        full_name: currentUser?.full_name,
        email: currentUser?.email,
        user_type: currentUser?.user_type,
        mobile: currentUser?.mobile,
        identification_card: currentUser?.identification_card,
        driving_license: currentUser?.driving_license,
      });
      console.log("initialValues ", initialValues);

      if (currentUser?.username === undefined) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    };
    fetchSession();
    // eslint-disable-next-line
  }, [currentUser?.username, initialValues?.user_id]);

  const handleSubmit = (formValue: FormValues) => {
    const reader: any = new FileReader();
    if (image) {
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
      if (!previewSource) return;
    } else {
      setPreviewSource("");
    }

    const ImageURL = { avatar: previewSource };
    let merge = { ...formValue, ...ImageURL };
    console.log("this is merge: ", merge);
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
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <Formik
            initialValues={{
              ...initialValues,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {(formik) => (
              <Container>
                <form onSubmit={formik.handleSubmit} className={classes.form}>
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    dropzoneText={"Drag and drop an avatar here or click"}
                    filesLimit={1}
                    onChange={(files) => {
                      setImage(files[0]);
                    }}
                  />
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

                  <div>
                    <InputLabel
                      id="demo-simple-select-outlined-label"
                      style={{
                        fontSize: "12px",
                        paddingLeft: "12px",
                      }}
                    >
                      Status
                    </InputLabel>
                    <Field
                      name="user_type"
                      type="select"
                      label="user_type"
                      id="user_type"
                      variant="outlined"
                      fullWidth
                      as={Select}
                    >
                      {types_of_users.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Field>
                  </div>

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
      )}
    </>
  );
};

export default UpdateProfile;
