import React from "react";
import { Formik } from "formik";
import * as yup from "../../../node_modules/yup";
import Button from "@material-ui/core/Button";
import Textfield from "../editProfile/FormsUI/Textfield";

import CircularProgress from "@material-ui/core/CircularProgress";

import { useState, useEffect } from "react";

import Cookies from 'js-cookie'


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

// interface FormValues {
//   full_name: string | undefined;
//   email: string | undefined;
//   user_type: string | undefined;
//   mobile: number | undefined;
//   identification_card: string | undefined;
//   driving_license: string | undefined
// }

interface FormValues {
  user_id: number | undefined,
  username: string | undefined,
  password: string | undefined,
  avatar: string | undefined,
  cloudinary_id: number | undefined,

  full_name: string | undefined,
  email: string | undefined,
  user_type: string | undefined,
  mobile: number | undefined,
  identification_card: string | undefined,
  driving_license: string | undefined
}

interface CurrentUser {
  user_id: number,
  username: string,
  password: string,
  full_name: string,
  email: string,
  avatar: string,
  user_type: string,
  mobile: number,
  identification_card: string,
  driving_license: string,
  cloudinary_id: number
}

// const INITIAL_FORM_STATE: FormValues = {
//   full_name: "abc",
//   email: "abc@abc.com",
//   user_type: "provider",
//   mobile: 12345678,
//   identification_card: "S1234567A",
//   driving_license: "S1234567A"
// };

const UpdateProfile: React.FC = () => {

  const currentUserID = "1";  // temporary to remove
  
  const [currentUser, setCurrentUser] = useState <CurrentUser> ();
  const [initialValues, setinitialValues] = useState <FormValues> ({
    user_id: 0,
    username: "",
    password: "",
    avatar: "",
    cloudinary_id: 0,

    full_name: "",
    email: "",
    user_type: "",
    mobile: 0,
    identification_card: "",
    driving_license: ""
  });  
  const [loading, setLoading] = useState <boolean> (false);

  useEffect(() => {
    setLoading(true)

    const fetchSession = async () => {

      // retrieve session ID from custom cookie
      const sidfromCookie = Cookies.get('cook') 
      console.log(sidfromCookie)

      const res = await fetch(`http://localhost:4000/sessions/check/${sidfromCookie}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      console.log("check useEffect server response", data.sessionDetails);
      const currentUserInfo = data.sessionDetails.currentUser;
      console.log("currentUser Data from Redis:", currentUserInfo);
      console.log(typeof currentUserInfo);

      setCurrentUser(currentUserInfo);
      console.log(currentUser)

      setinitialValues({
        user_id: currentUser?.user_id,
        username: currentUser?.username,
        password: currentUser?.password,
        avatar: currentUser?.avatar,
        cloudinary_id: currentUser?.cloudinary_id,

        full_name: currentUser?.full_name,
        email: currentUser?.email,
        user_type: currentUser?.user_type,
        mobile: currentUser?.mobile,
        identification_card: currentUser?.identification_card,
        driving_license: currentUser?.driving_license
      })
      console.log( "initialValues ", initialValues )

      if (currentUser?.username === undefined) {
        setLoading(true)
      }
      else {
        setLoading(false)
      }
    };
    fetchSession()
  }, [currentUser?.username, initialValues?.user_id]);


const handleSubmit = (formValue: FormValues) => {
 // const userImageURL = { image: displayImageUser };
  let merge = { ...formValue };
  console.log(merge);
  const updateUserAccount = async () => {
    try {
      const res = await fetch(
        "/users/"+currentUser?.user_id,    
        {
          method: "PUT",
          body: JSON.stringify(merge),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
      <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
        <Formik
          // initialValues={{
          //   ...INITIAL_FORM_STATE
          // }}

          initialValues={{
            ...initialValues
          }}

          onSubmit={
          handleSubmit
        }
          validationSchema={validationSchema}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Textfield
              
                id="full_name"
                name="full_name"
                label="Full_name"
                required
              />
              <Textfield
              
                id="email"
                name="email"
                label="Email"
                required
              />
              <Textfield
              
                id="user_type"
                name="user_type"
                label="User_type"
                required
              />
              <Textfield
              
                id="mobile"
                name="mobile"
                label="Mobile"
                required
              />

              <Textfield
            
                id="identification_card"
                name="identification_card"
                label="Identification_card"
                required
              />

              <Textfield
              
                id="driving_license"
                name="driving_license"
                label="Driving_license"
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
      )}
      </div>
    </>
  );
};

export default UpdateProfile;
