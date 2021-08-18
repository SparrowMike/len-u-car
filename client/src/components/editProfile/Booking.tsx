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
  rating: yup.string().required("Password is required"),
  review: yup.string().required("Password is required"),
});

interface FormValues {
  review_id: number | undefined;
  rating: number | undefined;
  review: string | undefined;
  username: string | undefined;
  cars_id: number | undefined;
  event_id: number | undefined;
}

interface CurrentUser {
  review_id: number;
  rating: number;
  review: string;
  username: string;
  cars_id: number;
  event_id: number;
}

const ChangePassword: React.FC<IProps> = ({user}) => {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState<CurrentUser>();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [initialValues, setInitialValues] = useState<FormValues>({
    review_id: undefined,
    rating: undefined,
    review: undefined,
    username: undefined,
    cars_id: undefined,
    event_id: undefined,
  });
console.log(user);
const fetchEvents = async () => {
    const { data } = await axios.get(
      `/carRentalEvent/username/${user.username}`
    );
    return data;
  };

 const { isLoading: islLoading2, data : data2  } = useQuery("carRentalEvent", fetchEvents);
 console.log("event data", data2);
 // const dd = data2?.rows;
  const handleSubmit = (formValue: FormValues) => {
    let merge = { ...initialValues };
    // merge.password_unhashed = formValue.password_unhashed;
    // console.log(merge);
    const updateUserAccount = async () => {
      try {
        const res = await fetch("/carRentalreview/" + currentUser?.review_id, {
          method: "PUT",
          body: JSON.stringify(merge),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(merge);
        console.log(res);
        alert("User profile updated succesfully!");
      } catch (error) {
        console.log(error);
      }
    };
    updateUserAccount();
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {data2?.map((card: any, index : any) =>(
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card className={classes.card} onClick={handleModalOpen}>
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
              initialValues={{ ...initialValues }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {(formik) => (
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend">Rating</Typography>
                    <Rating
                      name="customized-empty"
                      defaultValue={3}
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
