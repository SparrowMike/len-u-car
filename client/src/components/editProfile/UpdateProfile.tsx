import React from "react";
import { Formik } from "formik";
import * as yup from "../../../node_modules/yup";
import Button from "@material-ui/core/Button";
import Textfield from "../editProfile/FormsUI/Textfield";




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
  driving_license: string
}

const INITIAL_FORM_STATE: FormValues = {
  full_name: "abc",
  email: "abc@abc.com",
  user_type: "provider", // maybe can take out
  mobile: 12345678,
  identification_card: "S1234567A",
  driving_license: "S1234567A"
};


const UpdateProfile: React.FC = () => {

  const currentUser = "1";


const handleSubmit = (formValue: FormValues) => {
 // const userImageURL = { image: displayImageUser };
  let merge = { ...formValue };
  console.log(merge);
  const updateUserAccount = async () => {
    try {
      const res = await fetch(
        "http://localhost:4000/users/"+currentUser,
        {
          method: "PUT",
          body: JSON.stringify(merge),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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

      {" "}
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE
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
  );
};

export default UpdateProfile;
