import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Rating from "@material-ui/lab/Rating";
import Slider from "react-slick";
import cars from "../data/cars";
import Cars from "../components/cars/Cars";

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

const Home = () => {
  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    arrows: false,
  };

  const classes = useStyles();

  return (
    <>
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
                      <Typography variant="h5" color="inherit" paragraph>
                        <Rating
                          name="half-rating-read"
                          defaultValue={car.rating}
                          precision={0.25}
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
      <Cars />
    </>
  );
};

export default Home;
