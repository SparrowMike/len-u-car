import { useState } from "react";
import { Container, createTheme, ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import CarPage from "./components/carPage/CarPage";
import Navbar from "./components/home/Navbar";
import Browse from "./Pages/Browse";
import Editprofile from "./Pages/Editprofile";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF385C",
    },
    secondary: {
      main: "#FD5B61",
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
      xs: 375,
      sm: 640,
      md: 1250,
      lg: 1600,
      xl: 2260,
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
  const queryClient = new QueryClient();
  const [loggedIn, setloggedIn] = useState<boolean>(false);

  return (
    <div className={classes.toolbar}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Navbar setloggedIn={setloggedIn} loggedIn={loggedIn} />
          <Container maxWidth="md">
            <Switch>
              <Route path="/carpage/:cars_id">
                {!loggedIn && <Redirect to="/login" />}
                <CarPage />
              </Route>
              <Route path="/browse">
                <Browse />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login setloggedIn={setloggedIn} loggedIn={loggedIn} />
              </Route>
              <Route path="/editprofile">
                <Editprofile loggedIn={loggedIn} />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Container>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
