import "./App.css";
import Navbar from "./components/home/Navbar";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f37c9",
    },
    secondary: {
      main: "#34a0a4",
    },
  },
  typography: {
    fontFamily: "Poppins",
    fontWeightLight: 100,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

const useStyles = makeStyles((theme) => ({
  toolbar: {
    marginTop: 70,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.toolbar}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Container maxWidth="md">
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
