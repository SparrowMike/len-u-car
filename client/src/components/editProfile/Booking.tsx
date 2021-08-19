import React from "react";
import { Formik } from "formik";
import * as yup from "../../../node_modules/yup";
import Button from "@material-ui/core/Button";
import Textfield from "../editProfile/FormsUI/Textfield";
import { makeStyles, Modal, Fade, Backdrop } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

import { Card, CardActions } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

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
  const [rating, setRating] = useState<number>();
  const [carsId, setCarsId] = useState<number>();
  const [eventId, setEventId] = useState<number>();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = React.useState(false);

  const fetchEvents = async () => {
    const { data } = await axios.get(
      `/carRentalEvent/username/${user.username}`
    );
    return data;
  };

  const { data: data2 } = useQuery("carRentalEvent", fetchEvents);

  const handleSubmit = async (values: FormValues) => {
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
    setModalDeleteOpen(false);
  };

  const handleModalDelete = (e: any) => {
    setModalDeleteOpen(true);
    setEventId(e.card.event_id);
  };

  const handleDelete = () => {
    setModalDeleteOpen(false);
    fetch(`/carRentalEvent/${eventId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  return (
    <div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {data2?.map((card: any, index: any) => (
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
                  >
                    Review
                  </Button>
                  <Button
                    onClick={() => handleModalDelete({ card })}
                    variant="contained"
                    color="primary"
                  >
                    Cancel
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
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
                  <Container>
                    <Typography component="legend">Rating</Typography>
                    <Rating
                      name="customized-empty"
                      defaultValue={5}
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
        open={modalDeleteOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalDeleteOpen}>
          <div className={classes.paper}>
            <Container>
              <Typography variant="h5" component="legend">
                Proceed with booking cancellation?
              </Typography>
              <Button
                onClick={handleDelete}
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
