import React from "react";
import { Formik } from "formik";
import * as yup from "../../../node_modules/yup";
import Button from "@material-ui/core/Button";
import Textfield from "../editProfile/FormsUI/Textfield";
import { makeStyles, Modal, Fade, Backdrop } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import { useQuery, useMutation } from "react-query";

import { Card, CardActions } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import { IState as Props } from "./Edit";
interface IProps {
  user: Props["user"];
}

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
  rating: yup.string().required("Rating is required"),
  review: yup.string().required("Review is required"),
});

interface FormValues {
  rating: number | undefined;
  review: string | undefined;
  username: string | undefined;
  cars_id: number | undefined;
  event_id: number | undefined;
}

const initialValues: FormValues = {
  rating: 5,
  review: "",
  username: "",
  cars_id: 0,
  event_id: 0,
};

const ChangePassword: React.FC<IProps> = ({ user }) => {
  const classes = useStyles();
  const [username, setUsername] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [carsId, setCarsId] = useState<number>();
  const [eventId, setEventId] = useState<number>();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalArchiveOpen, setModalArchiveOpen] = React.useState(false);

  const fetchEvents = async () => {
    const { data } = await axios.get(
      `/carRentalEvent/username/${user.username}`
    );
    return data;
  };

  const { data: bookings } = useQuery("carRentalEvent", fetchEvents);

  const mutation: any = useMutation((reviewdone) =>
    axios.put(`/carRentalEvent/${eventId}`, reviewdone)
  );

  const handleSubmit = async (values: FormValues) => {
    mutation.mutate({
      reviewdone: true,
    });

    setModalOpen(false);
    const carData = {
      username: username,
      cars_id: carsId,
      event_id: eventId,
      rating: rating,
    };
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
    setUsername(e.card.username);
    setCarsId(e.card.cars_id);
    setEventId(e.card.event_id);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setModalArchiveOpen(false);
  };

  const handleModal = (e: any) => {
    setModalArchiveOpen(true);
    setUsername(e.card.username);
    setEventId(e.card.event_id);
  };

  let history = useHistory();
  const handleArchive = () => {
    setModalArchiveOpen(false);
    history.push(`/`);
    mutation.mutate({
      archive: true,
    });
  };

  //! DELETE ROUTE
  // const handleDelete = () => {
  //   setModalArchiveOpen(false);
  //   fetch(`/carRentalEvent/username/${username}/${eventId}`, {
  //     method: "DELETE",
  //   })
  //     .then((res) => res.json())
  //     .then((res) => console.log(res));
  // };

  return (
    <div>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* {bookings.length === 0 ? (
          <>
            <Typography gutterBottom variant="h5" component="h2">
              Currently you have no bookings
            </Typography>
            <Link to="/browse" style={{ textDecoration: "none" }}>
              <Button color="primary" variant="contained">
                Explore new cars!
              </Button>
            </Link>
          </>
        ) : ( */}
        <Grid container spacing={4}>
          {bookings
            ?.filter((card: any) => card.archive === false)
            .map((card: any, index: any) => (
              <Grid item key={index} md={12}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Car Booking {card.day}/{card.month}/{card.year}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => handleModalOpen({ card })}
                      variant="contained"
                      color="primary"
                      disabled={card.reviewdone}
                    >
                      Review The Car {card.reviewdone}
                    </Button>
                    <Button
                      onClick={() => handleModal({ card })}
                      variant="contained"
                      color="primary"
                      disabled={card.archive}
                    >
                      Archive
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
        {/* )} */}
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
                  <Container>
                    <Typography component="legend">Rating</Typography>
                    <Rating
                      name="customized-empty"
                      defaultValue={rating}
                      precision={0.5}
                      onChange={(e: any) => setRating(e.target.value)}
                      emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      size="large"
                    />
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
                  </Container>
                </form>
              )}
            </Formik>
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalArchiveOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalArchiveOpen}>
          <div className={classes.paper}>
            <Container>
              <Typography variant="h5" component="legend">
                Proceed with archive?
              </Typography>
              <Button
                onClick={handleArchive}
                color="primary"
                variant="contained"
                type="submit"
                style={{ margin: 10 }}
              >
                Confirm
              </Button>
            </Container>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ChangePassword;
