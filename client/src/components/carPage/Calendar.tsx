import React, { useState } from "react";
import { Day, Calendar, utils } from "react-modern-calendar-datepicker";

import { useEffect } from "react";
import Cookies from "js-cookie";

import { Button } from "@material-ui/core";
import { useQuery, useMutation } from "react-query";
import axios from "axios";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-router-dom";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    wrapper: {
      margin: theme.spacing(1),
      position: "relative",
    },
    buttonSuccess: {
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700],
      },
    },
    buttonProgress: {
      color: green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
  })
);

const CalendarMutation = ({ carID, pricePerDay, username }: any) => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedDays, setSelectedDays] = useState<Day[]>([]);

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef<number>();

  const [user, setUser] = useState<string>();

  useEffect(() => {
    const fetchSession = async () => {
      // retrieve session ID from custom cookie
      const sidfromCookie = Cookies.get("cook");
      console.log("Session Id from Cookie: ", sidfromCookie);

      const res = await fetch(`/sessions/check/${sidfromCookie}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log("check useEffect server response", data.sessionDetails);
      const currentUserCarsInfo = data.sessionDetails.currentUserCars;
      console.log("currentUser Data from Redis:", currentUserCarsInfo);
      setUser(data.sessionDetails.currentUser.username);
    };
    fetchSession();
  }, []);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const mutation: any = useMutation((newBooking) =>
    axios.post("/carRentalEvent", newBooking)
  );

  const fetchDates = async () => {
    const { data } = await axios.get(`/carRentalEvent/${carID}`);
    return data;
  };

  const { data } = useQuery("users", fetchDates);

  const handleSubmit = () => {
    for (let index of selectedDays) {
      mutation.mutate({
        day: index.day,
        month: index.month,
        year: index.year,
        username: user,
        cars_id: carID,
      });
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleButtonClick = () => {
    handleSubmit();
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div>
      {mutation.isLoading ? (
        "Confirm Booking..."
      ) : (
        <>
          <Calendar
            value={selectedDays}
            onChange={setSelectedDays}
            disabledDays={data}
            minimumDate={utils("en").getToday()}
            shouldHighlightWeekends
          />
          {mutation.isError ? <div>An error occurred</div> : null}

          {mutation.isSuccess ? <div>Booked</div> : null}
          <Button
            disabled={selectedDays.length > 0 ? false : true}
            variant="contained"
            color="primary"
            onClick={handleModalOpen}
          >
            Checkout
          </Button>

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
                <h2>Selected dates (dd/mm/yyyy):</h2>
                {selectedDays?.map((user, index) => (
                  <h4 key={index}>
                    {user.day + "/" + user.month + "/" + user.year}
                  </h4>
                ))}
                <h2>Price (S$/day):</h2> <h4>{pricePerDay}</h4>
                <h2>Total price (S$): </h2>
                <h4> {pricePerDay * selectedDays.length}</h4>
                <div className={classes.wrapper}>
                  <Link to={"/"} style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={buttonClassname}
                      disabled={loading}
                      onClick={handleButtonClick}
                    >
                      Accept terms
                    </Button>
                  </Link>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </div>
            </Fade>
          </Modal>
        </>
      )}
    </div>
  );
};

export default CalendarMutation;
