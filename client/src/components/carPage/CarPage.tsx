import React from "react";

import { makeStyles, Grid, Paper, Container, Divider } from "@material-ui/core";

import Slider from "react-slick";

import cars from "../../data/cars";

const useStyles = makeStyles((theme) => ({
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

  main: {
    padding: theme.spacing(2),
    textAlign: "center",
    height: "500px",
  },

  side: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "500px",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  divider: {
    margin: theme.spacing(2, 0),
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
            <div key={index}>
              <div
                className={classes.mainFeaturedPost}
                style={{ backgroundImage: `url(${car.image})` }}
              />
            </div>
          );
        })}
      </Slider>
      <Container className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Paper className={classes.main}>
              Main
              <Divider className={classes.divider} />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.side}>Side</Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
