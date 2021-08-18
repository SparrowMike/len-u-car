import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Cookies from "js-cookie";

const useStyles = makeStyles({
  form: {
    marginTop: 20,
  },
  field: {
    marginTop: 10,
  },
});

interface FormValues {
  images_id: number | undefined;
  cloudinary_id: string | undefined;
  secure_url: string | undefined;
  cars_id: number | undefined;
}

interface currentCarImage {
  images_id: number;
  cloudinary_id: string;
  secure_url: string;
  cars_id: number;
}

const UploadCars: React.FC = () => {
  const classes = useStyles();
  const [car, setCar] = useState<number>(0);
  const [carImage, setCarImage] = useState<currentCarImage>();

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
      const currentCarInfo = data.sessionDetails.currentUserCars[0];
      console.log("currentCar Data from Redis:", currentCarInfo);
      setCar(data.sessionDetails.currentUserCars[0].cars_id);
      console.log(car);
    };
    fetchSession();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch(`/images/image/${car}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const imageData = await res.json();
      console.log(imageData[0]);

      if (imageData.length > 0) {
        setCarImage(imageData[0]);
        console.log("this is carImage: ", imageData[0]);
      } else {
        console.log("there was nothing in array");
      }
    };
    fetchImages();
  }, [car]);

  return (
    <div>
      {carImage !== undefined ? (
        <img src={carImage.secure_url} alt="" style={{ maxHeight: "280px" }} />
      ) : (
        <h1>Nothing</h1>
      )}
    </div>
  );
};

export default UploadCars;
