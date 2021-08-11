import React from "react";

import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Typography,
  Container,
  CardHeader,
  Avatar,
  IconButton,
} from "@material-ui/core";

import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

import cars from "../../data/cars";
import users from "../../data/users";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    "&:hover": {
      // boxShadow: "0 0 1px 1px #9d0208 inset",
      boxShadow: "0 0.6em 0.5em -0.4em lightgrey",
      transform: "translateY(-0.15em)",
      cursor: "pointer",
    },
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cars.map((car, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="Remy Sharp"
                        src={users[index].avatar}
                        className={classes.avatar}
                      />
                    }
                    title={car.brand}
                    subheader={car.model}
                  />
                  <CardMedia
                    className={classes.media}
                    image={car.image}
                    onClick={() => console.log(car.brand)}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {car.key_features}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
