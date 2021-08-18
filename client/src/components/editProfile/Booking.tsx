// import React from "react";
// import { Form, Formik } from "formik";
// import * as yup from "../../../node_modules/yup";
// import Button from "@material-ui/core/Button";
// import Textfield from "../editProfile/FormsUI/Textfield";
// import { makeStyles } from "@material-ui/core";
// import { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import Rating from "@material-ui/lab/Rating";
// import StarBorderIcon from "@material-ui/icons/StarBorder";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";

// const useStyles = makeStyles({
//   form: {
//     marginTop: 20,
//   },
//   field: {
//     marginTop: 10,
//   },
// });

// const validationSchema = yup.object({
//   password_unhashed: yup
//     .string()
//     .min(5, "Password should be of minimum 5 characters length")
//     .required("Password is required"),
// });

// // interface FormValues {
// //   user_id: number | undefined;
// //   username: string | undefined;
// //   password_unhashed: string | undefined;
// //   avatar: string | ArrayBuffer | undefined;
// //   cloudinary_id: string | undefined;
// //   full_name: string | undefined;
// //   email: string | undefined;
// //   user_type: string | undefined;
// //   mobile: number | undefined;
// //   identification_card: string | undefined;
// //   driving_license: string | undefined;
// // }

// interface FormValues {
//   rating: number | undefined;
//   review: string | undefined;
//   username: string | undefined;
//   cars_id: number | undefined;
//   event_id: number | undefined;
// }

// // interface CurrentUser {
// //   user_id: number;
// //   username: string;
// //   password: string;
// //   full_name: string;
// //   email: string;
// //   avatar: string;
// //   user_type: string;
// //   mobile: number;
// //   identification_card: string;
// //   driving_license: string;
// //   cloudinary_id: string;
// // }

// const initialValues: FormValues = {
//   rating: 0,
//   review: "",
//   username: "",
//   cars_id: 0,
//   event_id: 0,
// };

// const ChangePassword: React.FC = () => {
//   const classes = useStyles();
//   // const [currentUser, setCurrentUser] = useState<CurrentUser>();
//   // const [initialValues, setinitialValues] = useState<FormValues>({
//   //   rating: undefined,
//   //   review: undefined,
//   //   username: undefined,
//   //   cars_id: undefined,
//   //   event_id: undefined,
//   // });

//   // useEffect(() => {
//   //   const fetchSession = async () => {
//   //     // retrieve session ID from custom cookie
//   //     const sidfromCookie = Cookies.get("cook");
//   //     console.log("Session Id from Cookie: ", sidfromCookie);

//   //     const res = await fetch(`/sessions/check/${sidfromCookie}`, {
//   //       method: "GET",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //     });

//   //     const data = await res.json();

//   //     console.log("check useEffect server response", data.sessionDetails);
//   //     const currentUserInfo = data.sessionDetails.currentUser;
//   //     console.log("currentUser Data from Redis:", currentUserInfo);

//   //     setCurrentUser(currentUserInfo);
//   //     console.log(currentUser);

//   //     setinitialValues({
//   //       user_id: currentUser?.user_id,
//   //       username: currentUser?.username,
//   //       password_unhashed: currentUser?.password,
//   //       avatar: currentUser?.avatar,
//   //       cloudinary_id: currentUser?.cloudinary_id,
//   //       full_name: currentUser?.full_name,
//   //       email: currentUser?.email,
//   //       user_type: currentUser?.user_type,
//   //       mobile: currentUser?.mobile,
//   //       identification_card: currentUser?.identification_card,
//   //       driving_license: currentUser?.driving_license,
//   //     });
//   //     console.log("initialValues ", initialValues);
//   //   };
//   //   fetchSession();
//   //   // eslint-disable-next-line
//   // }, [currentUser?.username, initialValues?.user_id]);

//   const handleSubmit = async (values: FormValues) => {
//     try {
//       const res = await fetch("http://localhost:4000/carRentalReview", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(values),
//       });
//       console.log(res);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <div>
//       {/* <Formik
//         initialValues={{ ...initialValues }}
//         onSubmit={handleSubmit}
//         validationSchema={validationSchema}
//       >
//         {(formik) => (
//           <form className={classes.form} onSubmit={formik.handleSubmit}>
//             <Box component="fieldset" mb={3} borderColor="transparent">
//               <Typography component="legend">Controlled</Typography>
//               <Rating
//                 name="customized-empty"
//                 defaultValue={3}
//                 precision={0.25}
//                 emptyIcon={<StarBorderIcon fontSize="inherit" />}
//                 size="large"
//               />
//             </Box>
//             <Textfield
//               className={classes.field}
//               id="password"
//               name="password_unhashed"
//               label="Password"
//               required
//             />

//             <Button
//               color="primary"
//               variant="contained"
//               type="submit"
//               style={{ marginTop: 10 }}
//             >
//               Submit
//             </Button>
//           </form>
//         )}
//       </Formik> */}

//       <Form>
//         <Textfield
//           name="rating"
//           label="Rating"
//           className={classes.field}
//           required
//         />
//         <Textfield
//           name="password_unhashed"
//           label="Password"
//           type="password"
//           className={classes.field}
//           required
//         />
//         <Textfield
//           name="passwordConfirm"
//           label="Confirm Password"
//           type="password"
//           className={classes.field}
//           required
//         />
//         <Textfield
//           name="email"
//           label="Email"
//           className={classes.field}
//           required
//         />
//         <Textfield
//           name="full_name"
//           label="Full Name"
//           className={classes.field}
//           required
//         />
//         <div className={classes.submitBtn}>
//           <Button>
//             <Typography style={{ fontWeight: 700 }}>Register</Typography>
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default ChangePassword;

import React from 'react'

const Booking = () => {
  return (
    <div>
      
    </div>
  )
}

export default Booking
