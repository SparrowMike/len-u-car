import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Typography } from "@material-ui/core";

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

export default function NewSession() {
  const classes = useStyles();
  const [signIn, setSignIn] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    console.log("login ok");

    console.log(JSON.stringify(signIn));
    const createNewLogin = async () => {
      const res = await fetch("http://localhost:3003/sessions", {
        method: "POST",
        body: JSON.stringify(signIn),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    };
    createNewLogin();
  };

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
}
