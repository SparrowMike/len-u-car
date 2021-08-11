import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";

import Paper from "@material-ui/core/Paper";
import Slider from "react-slick";

import cars from "../../data/cars";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },

  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450,
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "450px",
    width: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(6),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(12),
      paddingRight: 0,
    },
  },
}));

export default function CarPage() {
  const classes = useStyles();

  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,
  };

  return (
    <div>
      <Slider {...slickSettings}>
        {cars.map((car, index) => {
          return (
            <Paper key={index}>
              <div
                className={classes.mainFeaturedPost}
                style={{ backgroundImage: `url(${car.image})` }}
              >
                <div className={classes.overlay} />
                <Grid container>
                  <Grid item md={6}>
                    <div className={classes.mainFeaturedPostContent}>
                      <Typography
                        component="h2"
                        variant="h4"
                        color="inherit"
                        gutterBottom
                      >
                        Brand: {car.brand}
                      </Typography>
                      <Typography variant="h5" color="inherit" paragraph>
                        Features: {car.key_features}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Paper>
          );
        })}
      </Slider>
    </div>
  );
}
