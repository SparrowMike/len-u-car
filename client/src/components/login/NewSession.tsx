import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import Cookies from "js-cookie";

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

interface IProps {
  setloggedIn: Dispatch<SetStateAction<boolean>>;
  loggedIn: boolean;
}

const NewSession: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [signIn, setSignIn] = useState({
    username: "",
    password: "",
  });
  const [sidvalid, setSidvalid] = useState<boolean>(false);

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const createNewLogin = async () => {
      const res = await fetch("/sessions", {
        method: "POST",
        body: JSON.stringify(signIn),
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      });
      const data = await res.json();
      // console.log(data);
      // set session ID into custom cookie
      Cookies.set("cook", data.currentSID);

      if (data.currentSID !== undefined) {
        // props.setloggedIn(true)
        setSidvalid(true);
      } else {
        // props.setloggedIn(false)
        setSidvalid(false);
      }
      console.log("NewSession sidvalid: ", sidvalid);

      history.push("/");
    };
    createNewLogin();
  };

  useEffect(() => {
    if (sidvalid === true) {
      props.setloggedIn(true);
    } else {
      props.setloggedIn(false);
    }
    console.log("loggedIn: ", props.loggedIn);
  }, [sidvalid]);

  return (
    <Container>
      <Typography variant="h4" align="center" style={{ fontWeight: 600 }}>
        Len-U-Car
      </Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          onChange={(e: React.ChangeEvent<any>) =>
            setSignIn({ ...signIn, username: e.target.value })
          }
          className={classes.field}
          label="Username"
          variant="outlined"
          fullWidth
        />
        <br />
        <TextField
          onChange={(e: React.ChangeEvent<any>) =>
            setSignIn({ ...signIn, password: e.target.value })
          }
          className={classes.field}
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
        />
        <br />
        <Button
          type="submit"
          className={classes.form}
          color="secondary"
          variant="contained"
          size="large"
          fullWidth
        >
          <Typography style={{ fontWeight: 700 }}>Log in</Typography>
        </Button>
      </form>
      <Typography className={classes.footer} align="center" variant="subtitle2">
        Forgot password?
      </Typography>
    </Container>
  );
};

export default NewSession;
