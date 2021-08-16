import React from "react";

import {
  makeStyles,
  Grid,
  Paper,
  Container,
  Divider,
  Avatar,
  Typography,
} from "@material-ui/core";

import Slider from "react-slick";

import cars from "../../data/cars";
import { IState as Props } from "../../Pages/Browse";
import { useLocation } from "react-router";

interface LocationState {
  data: Props["users"];

}


const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "450px",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.06)",
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
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function CarPage() {
  const location = useLocation()
  const notify = location.state.data;
  console.log(location.state);
  console.log(location.state.data.brand)
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
              </div>
            </Paper>
          );
        })}
      </Slider>

      <Container className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Paper className={classes.main}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    className={classes.avatar}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography>Johnny Bravo</Typography>
                </Grid>
              </Grid>
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
};

export default CarPage;