import "./App.css";
import Navbar from "./components/home/Navbar";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";

const theme = createTheme({
  palette: {
    primary: {
      main: "#168aad",
    },
    secondary: {
      main: "#d9ed92",
    },
  },
  typography: {
    fontFamily: "Poppins",
    fontWeightLight: 100,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  breakpoints: {
    values: {
      xs: 480,
      sm: 768,
      md: 1024,
      lg: 1200,
      xl: 1920,
    },
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
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
