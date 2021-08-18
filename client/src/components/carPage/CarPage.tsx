import React from "react";

import {
  makeStyles,
  Grid,
  Paper,
  Container,
  Divider,
  Avatar,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";

import Slider from "react-slick";

import { useLocation } from "react-router";

import Calendar from "./Calendar";

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
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
}));

// const CarPage: React.FC<IState> = ({ user }) => {
const CarPage = () => {
  const classes = useStyles();
  const location: any = useLocation();

  console.log("location", location);
  console.log("state", location.state);

  const data: IState = location.state.data.user;

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
            style={{ backgroundImage: `url(${data.secure_url})` }}
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
                    src={data.avatar}
                    className={classes.avatar}
                  />
                  <Typography gutterBottom variant="h5" component="h2">
                    {data.username}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Brand: {data.brand}
                      </Typography>
                      <Typography>Model: {data.model}</Typography>
                      <Typography> Engine Type: {data.engine_type}</Typography>
                      <Typography>Transmission: {data.transmission}</Typography>
                    </CardContent>
                  </Card>

                  {/*  */}
                  <Divider className={classes.divider} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.side}>
              <Calendar
                carID={data.cars_id}
                pricePerDay={data.price_per_day}
              />
            </Paper>
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
