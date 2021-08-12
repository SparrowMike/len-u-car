import "./App.css";
import Navbar from "./components/home/Navbar";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { PaginationTEST } from "./components/cars/PaginationTEST";
import CarPage from "./components/carPage/CarPage";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

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

  return (
    <div className={classes.toolbar}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Container maxWidth="md">
            <Switch>
              <Route path="/pagination">
                <PaginationTEST />
              </Route>
              <Route path="/carpage">
                <CarPage />
              </Route>

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
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
