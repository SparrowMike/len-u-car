import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Rating from "@material-ui/lab/Rating";
import Slider from "react-slick";
import cars from "../data/cars";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardHeader,
  Container,
  CssBaseline,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";

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

  const getFetchData = async () => {
    try {
      const fetchData = await axios.get("http://localhost:4000/users/random");
      console.log(fetchData.data);
      setDisplay(fetchData.data);
      console.log(display);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  return (
    <>
      <Slider {...slickSettings}>
        {cars.map((car, index) => {
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
                          defaultValue={car.rating}
                          precision={0.5}
                          readOnly
                        />
                      </Typography>
                      <Link variant="subtitle1" href="#">
                        Check out
                      </Link>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Paper>
          );
        })}
      </Slider>
      {display.map((car) => {
        <p>{car.brand}</p>;
      })}
    </>
  );
};

export default Home;
