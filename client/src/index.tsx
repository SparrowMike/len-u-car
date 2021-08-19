import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,

  document.getElementById("root")
);
