import {
  Card,
  CardHeader,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import StarIcon from "@material-ui/icons/Star";
import React from "react";
import { Link } from "react-router-dom";
import { IState as Props } from "../../Pages/Browse";

interface IProps {
  users: Props["users"];
  carType: Props["carType"];
  transmission: Props["transmission"];
  engineType: Props["engineType"];
}

interface Filter {
  type?: string;
  transmission?: string;
  engine_type?: string;
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
    transition: ".3s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
      cursor: "pointer",
    },
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

const Cars: React.FC<IProps> = ({
  users,
  carType,
  transmission,
  engineType,
}) => {
  const classes = useStyles();

  let filter: Filter = {
    type: carType,
    transmission: transmission,
    engine_type: engineType,
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.container} maxWidth="md">
          <Grid container spacing={4}>
            {users?.filter((user, index) => {
              let count = 0;
              for (var key in filter) {
                if (filter[key as keyof typeof filter] === "") {
                  count += 1;
                  if (count === 3) {
                    return true;
                  }
                } else if (
                  user[key as keyof typeof filter] === "" ||
                  user[key as keyof typeof filter] !==
                    filter[key as keyof typeof filter]
                ) {
                  return false;
                }
              }
              return true;
            }).length ? (
              users
                ?.filter((user, index) => {
                  let count = 0;
                  for (var key in filter) {
                    if (filter[key as keyof typeof filter] === "") {
                      count += 1;
                      if (count === 3) {
                        return true;
                      }
                    } else if (
                      user[key as keyof typeof filter] === "" ||
                      user[key as keyof typeof filter] !==
                        filter[key as keyof typeof filter]
                    ) {
                      return false;
                    }
                  }
                  return true;
                })
                .map((user, index) => (
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
                          <CardHeader
                            title={user.brand}
                            subheader={user.model}
                          />
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
                ))
            ) : (
              <h3>
                No cars available with specified requirements. Please select
                again.
              </h3>
            )}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default Cars;
