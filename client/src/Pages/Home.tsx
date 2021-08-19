import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardHeader,
  Container,
  Grid,
  Typography,
  Paper,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import { useState, useEffect } from "react";
import StarIcon from "@material-ui/icons/Star";

// import { IState as Props } from "../Pages/Browse";

export interface IState {
  users: {
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
  }[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    borderRadius: "10px",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "450px",
    transition: ".3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      cursor: "pointer",
    },
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
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    transition: ".3s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
      cursor: "pointer",
    },
  },
}));

interface displayValues {
  cars_id: number;
  price_per_day: number;
  brand: string;
  model: string;
  secure_url: string;
}

const Home = () => {
  const classes = useStyles();
  const [display, setDisplay] = useState<displayValues[] | []>([]);
  const [displaySlick, setDisplaySlick] = useState<displayValues[] | []>([]);
  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1800,
    cssEase: "linear",
    arrows: false,
  };

  const getFetchData = async () => {
    try {
      const fetchData = await axios.get("/users/random");
      setDisplay(fetchData.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getRandomSlick = async () => {
    try {
      const fetchData = await axios.get("/users/randomSlick");
      setDisplaySlick(fetchData.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("cards", display);

  useEffect(() => {
    getFetchData();
    getRandomSlick();
  }, []);

  return (
    <>
      <Slider {...slickSettings}>
        {displaySlick.map((car, index) => {
          return (
            <Paper key={index}>
              <div
                className={classes.mainFeaturedPost}
                style={{ backgroundImage: `url(${car.secure_url})` }}
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
                        <Rating
                          name="half-rating-read"
                          defaultValue={4.6}
                          precision={0.5}
                          readOnly
                        />
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Paper>
          );
        })}
      </Slider>
      <Container className={classes.container} maxWidth="md">
        <Grid container spacing={4}>
          {display.map((user, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card className={classes.root}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={{
                    pathname: `/carpage/${user.cars_id}`,
                    state: { data: { user } },
                  }}
                >
                  <CardMedia
                    className={classes.media}
                    image={user.secure_url}
                  />
                </Link>
                <Grid container>
                  <Grid item xs>
                    <CardHeader title={user.brand} subheader={user.model} />
                  </Grid>
                  <Grid item>
                    <CardHeader
                      avatar={
                        <StarIcon
                          style={{
                            color: "#FDCC0D",
                            position: "relative",
                            width: "15px",
                            left: 70,
                            top: 12,
                          }}
                        />
                      }
                      align="right"
                      title={`$ ${user.price_per_day} / day`}
                      // subheader={`${user.rating.toFixed(1)}`}
                      subheader="4.7"
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
