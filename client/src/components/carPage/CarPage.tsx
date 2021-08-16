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

import { useLocation } from "react-router";
import cars from "../../data/cars";

export interface IState {
  avatar: string;
  brand: string;
  cars_id: number;
  cloudinary_id: string;
  driving_license: string;
  email: string;
  engine_type: string;
  full_name: string;
  identification_card: string;
  images_id: number;
  key_features: string;
  key_rules: string;
  mileage: string;
  mobile: number;
  model: string;
  passenger_capacity: number;
  password: string;
  pick_up_point: string;
  price_per_day: number;
  secure_url: string;
  status: string;
  transmission: string;
  type: string;
  user_id: number;
  user_type: string;
  username: string;
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

// const CarPage: React.FC<IState> = ({ user }) => {
const CarPage = () => {
  const classes = useStyles();
  const location: any = useLocation();

  console.log(location);
  const userAvatar = location.state.data.user.avatar;
  const username = location.state.data.user.username;
  const email = location.state.data.user.email;
  const mobile = location.state.data.user.mobile;
  const status = location.state.data.user.mobile;

  const brand = location.state.data.user.brand;
  const model = location.state.data.user.model;
  const passenger_capacity = location.state.data.user.passenger_capacity;
  const secure_url = location.state.data.user.secure_url;
  const pick_up_point = location.state.data.user.pick_up_point;
  const price_per_day = location.state.data.user.price_per_day;

  const engine_type = location.state.data.user.engine_type;
  const mileage = location.state.data.user.mileage;
  const key_features = location.state.data.user.key_features;
  const transmission = location.state.data.user.transmission;
  const type = location.state.data.user.type;

  console.log("avatar", userAvatar, "and the brand", brand);

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
        {/* {cars.map((car, index) => {
          return ( */}
        <Paper>
          <div
            className={classes.mainFeaturedPost}
            style={{ backgroundImage: `url(${secure_url})` }}
          >
            <div className={classes.overlay} />
          </div>
        </Paper>
        {/* );
        })} */}
      </Slider>

      <Container className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Paper className={classes.main}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Avatar
                    alt="Remy Sharp"
                    src={userAvatar}
                    className={classes.avatar}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography>{username}</Typography>
                  <Divider className={classes.divider} />
                  <Typography variant="subtitle1">Brand: {brand}</Typography>
                  <Typography variant="body2">Model: {model}</Typography>
                  <Typography variant="subtitle1">
                    Engine Type: {engine_type}
                  </Typography>
                  <Typography variant="subtitle1">
                    Transmission: {transmission}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.side}>Side</Paper>
          </Grid>
        </Grid>
      </Container>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Paper className={classes.main}></Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CarPage;
