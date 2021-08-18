import React from "react";
import { Formik } from "formik";
import * as yup from "../../../node_modules/yup";
import Button from "@material-ui/core/Button";
import Textfield from "../editProfile/FormsUI/Textfield";
import { makeStyles, Modal, Fade, Backdrop } from "@material-ui/core";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useQuery } from "react-query";

import { Card, Box } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: 20,
  },
  field: {
    marginTop: 10,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: ".3s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
      cursor: "pointer",
    },
  },
  cardContent: {
    flexGrow: 1,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const validationSchema = yup.object({
  rating: yup.string().required("Password is required"),
  review: yup.string().required("Password is required"),
});

interface FormValues {
  rating: number | undefined;
  review: string | undefined;
  username: string | undefined;
  cars_id: number | undefined;
  event_id: number | undefined;
}

interface CurrentUser {
  rating: number;
  review: string;
  username: string;
  cars_id: number;
  event_id: number;
}

const initialValues: FormValues = {
  rating: 5,
  review: "",
  username: "",
  cars_id: 0,
  event_id: 0,
};

const ChangePassword: React.FC = () => {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState<CurrentUser>();
  const [username, setUsername] = useState<string>("");
  const [carsId, setCarsId] = useState<number>();
  const [eventId, setEventId] = useState<number>();
  const [modalOpen, setModalOpen] = React.useState(false);

 

  useEffect(() => {
    const fetchSession = async () => {
      // retrieve session ID from custom cookie
      const sidfromCookie = Cookies.get("cook");
      const res = await fetch(`/sessions/check/${sidfromCookie}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      const currentUserInfo = data.sessionDetails.currentUser;
      setCurrentUser(currentUserInfo);
    };
    fetchSession();
    // eslint-disable-next-line
  }, [currentUser?.username]);

  const { status, data } = useQuery("carRentalEvent", () =>
    axios(`/carRentalEvent/username/${currentUser?.username}`)
  );
  const reviewData: any = data?.data;

  console.log(reviewData);

  const handleSubmit = async (values: FormValues) => {
    const carData = { username: username, cars_id: carsId, event_id: eventId };
    let merge = { ...values, ...carData };
    console.log(merge);
    try {
      const res = await fetch("/carRentalreview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(merge),
      });

      console.log(res);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleModalOpen = (e: any) => {
    setModalOpen(true);
    console.log(e.card);

    setUsername(e.card.username);
    setCarsId(e.card.cars_id);
    setEventId(e.card.event_id);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {reviewData?.map((card: any, index: number) =>
            status === "loading" ? (
              <h1>loading!</h1>
            ) : (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  className={classes.card}
                  onClick={() => handleModalOpen({ card })}
                >
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Car Booking {card.day}/{card.month}/{card.year}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          )}
        </Grid>
      </Container>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <div className={classes.paper}>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {(formik) => (
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                  <Box component="fieldset" mb={5} borderColor="transparent">
                    <Typography component="legend">Rating</Typography>
                    <Rating
                      name="customized-empty"
                      defaultValue={5}
                      precision={0.25}
                      emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      size="large"
                    />
                  </Box>
                  <Textfield
                    className={classes.field}
                    id="review"
                    name="review"
                    label="review"
                    rows={5}
                    cols={5}
                    required
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    style={{ marginTop: 10 }}
                  >
                    Submit
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ChangePassword;
