import React, {useEffect, useState} from "react";

import {
  makeStyles,
  Grid,
  Paper,
  Container,

  Avatar,
  Typography,

  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead
} from "@material-ui/core";

import Slider from "react-slick";

import { useLocation } from "react-router";

import Calendar from "./Calendar";
import ActionYoutubeSearchedFor from "material-ui/svg-icons/action/youtube-searched-for";

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

export interface IReview {
  review_id: number;
  rating: number,
  review: string,
  username: string,
  cars_id: number,
  event_id: number,
  day: string
  month: string
  year: string,
  reviewdone: boolean
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
    height: "auto",
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
  alignright: {
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'flex-end',
    justify: "center"
  },
}));

// const CarPage: React.FC<IState> = ({ user }) => {
const CarPage = () => {
  const [carReviews, setCarReviews] = useState<IReview[]>([]);
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

  useEffect(() => {
    const fetchCarReviews = async () => {

      const carId = data.cars_id;
      console.log("Car Id shown at car page: ", carId);

      const res = await fetch(`/carRentalReview/join/${carId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("carReviews_res: ", res);

      const carReviews_data = await res.json();
      console.log("carReviews_data (array): ", carReviews_data);
      console.log("carReviews_data 1st element: ", carReviews_data[0]);

      if( carReviews_data ) setCarReviews( carReviews_data)
      console.log("carReviews state data: ", carReviews);
      console.log("carReviews state 1st element: ", carReviews[0]);

      console.log("carReviews.length: ", carReviews.length )
    };
    fetchCarReviews();
  }, [ carReviews[0]?.cars_id] );

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
              <Grid>
                <Grid item xs={12} >
                  <Avatar
                    alt="Remy Sharp"
                    src={data.avatar}
                    className={classes.avatar}
                  />
                </Grid>
                <Grid item xs={12} >
                  <Typography gutterBottom variant="subtitle2" component="h2" align='left'>
                    {data.username}
                  </Typography>
                </Grid>
              </Grid>

            
              <Typography gutterBottom variant="h4" component="h2" align='left'>
                {`${data.brand}, ${data.model}` }
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell style={{width: '30%'}}>Type:</TableCell>
                    <TableCell>{data.type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{width: '30%'}}>Passenger Capacity:</TableCell>
                    <TableCell>{data.passenger_capacity}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{width: '30%'}}>Transmission:</TableCell>
                    <TableCell>{data.transmission}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{width: '30%'}}>Price per day:</TableCell>
                    <TableCell>{data.price_per_day}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{width: '30%'}}>Mileage:</TableCell>
                    <TableCell>{data.mileage}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{width: '30%'}}>Engine Type:</TableCell>
                    <TableCell>{data.engine_type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{width: '30%'}}>Key Features:</TableCell>
                    <TableCell>{data.key_features}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{width: '30%'}}>Key Rules:</TableCell>
                    <TableCell>{data.key_rules}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{width: '30%'}}>Status:</TableCell>
                    <TableCell>{data.status}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{width: '30%'}}>Pick Up Point:</TableCell>
                    <TableCell>{data.pick_up_point}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
          <Paper className={classes.main}>
          <Typography gutterBottom variant="h6" component="h2" align='left'>
                Car Reviews
          </Typography>
            { 
              carReviews.length ? (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align='center' style={{width: '20%'}}>Review Date</TableCell>
                      <TableCell align='center'>Rating</TableCell>
                      <TableCell style={{width: '70%'}}>Review</TableCell>
                      <TableCell style={{width: '5%'}} align='center'>Rentee's username</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {carReviews.map((row) => (
                      <TableRow key={row.review_id}>
                        <TableCell align='center'>
                          {(row.day!==null) ? (row.day.toString() + "-" + row.month.toString() + "-" + row.year.toString()) : "-" }
                        </TableCell>
                        <TableCell align='center'>{(row.rating!==null) ? row.rating : "-" }</TableCell>
                        <TableCell>{(row.review!==null) ? row.review : "-" }</TableCell>
                        <TableCell align='center'>{row.username}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>No reviews yet for this car!</p>
              )
            }
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CarPage;
