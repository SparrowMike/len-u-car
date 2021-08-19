import React from "react";
import { useHistory } from "react-router-dom";
import Edit from '../components/editProfile/Edit';


interface IProps {
  loggedIn: boolean
}

const Editprofile: React.FC<IProps>  = (props) => {
  const history = useHistory();

  return (
    <>
    { props.loggedIn ? <Edit/> : history.push('/login') }
    </>
  );
};

export default Editprofile;