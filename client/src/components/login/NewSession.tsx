import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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
      Cookies.set("cook", data.currentSID);

      if (data.currentSID !== undefined) {
        // props.setloggedIn(true)
        setSidvalid(true);
      } else {
        // props.setloggedIn(false)
        setSidvalid(false);
      }
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
    // eslint-disable-next-line
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
