//! Does not work yet
// import { useState } from "react";
// import AddCar from "../components/register/AddCar";
// import CreateAccount from "../components/register/CreateAccount";
// import UpdateProfile from "../components/register/UpdateProfile";

// const Register = () => {
//   const [userData, setUserData] = useState();
//   const [showCreateAccount, setCreateAccount] = useState(true);
//   const [showUpdateProfile, setShowUpdateProfile] = useState(false);
//   const [showAddCar, setShowAddCar] = useState(false);

//   const registerNewUser = (data: any) => {
//     setUserData(data);
//     setCreateAccount(false);
//     setShowUpdateProfile(true);
//     console.log("registerNewUser,", data);
//   };

//   const updateProfile = () => {
//     setShowUpdateProfile(false);
//     setShowAddCar(true);
//     console.log("user", userData, "updated");
//   };

//   const addCar = (carData: any) => {
//     setShowAddCar(false);
//     console.log("car", carData.name, "created");
//   };

//   return (
//     <div>
//       {showCreateAccount ? (
//         <CreateAccount registerNewUser={registerNewUser} />
//       ) : (
//         ""
//       )}
//       {showUpdateProfile ? (
//         <UpdateProfile updateProfile={updateProfile} userData={userData} />
//       ) : (
//         ""
//       )}
//       {showAddCar ? <AddCar addCar={addCar} userData={userData} /> : ""}
//     </div>
//   );
// };

// export default Register;

//* Temporary Placeholder
const Register = () => {
  return (
    <div>
      Register
    </div>
  )
}

export default Register
