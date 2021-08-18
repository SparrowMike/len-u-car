import {
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  makeStyles,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import { Field } from "formik";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import * as yup from "../../../node_modules/yup";
import Textfield from "../editProfile/FormsUI/Textfield";
import MultiStepForm, { FormStep } from "./MultiStepForm";
import "../../App.css";

const useStyles = makeStyles({
  form: {
    marginTop: 20,
  },
  field: {
    marginTop: 10,
  },
});

//* Variables
let passenger_cap: Array<number> = [1, 2, 3, 4, 5, 6];
let car_status: Array<string> = ["Available", "Not Available"];

const validation_part_1 = yup.object({
  brand: yup.string().required("Brand is required"),
  model: yup.string().required("Model is required"),
  type: yup.string().required("Type is required"),
  price_per_day: yup
    .number()
    .required("Price (S$) per day is required")
    .positive()
    .integer(),
  mileage: yup.string().required("Mileage is required"),
  engine_type: yup.string().required("Engine type is required"),
  status: yup.string().required("Status is required"),
});

const validation_part_2 = yup.object({
  passenger_capacity: yup
    .number()
    .required("Passenger capacity is required")
    .positive()
    .integer(),
  key_features: yup.string(),
  key_rules: yup.string(),
  pick_up_point: yup.string().required("Pick up point is required"),
});

interface FormValues {
  cars_id: number | undefined;
  brand: string | undefined;
  model: string | undefined;
  type: string | undefined;
  passenger_capacity: number | undefined;
  transmission: string | undefined;
  price_per_day: number | undefined;
  mileage: string | undefined;
  engine_type: string | undefined;
  key_features: string | undefined;
  key_rules: string | undefined;
  status: string | undefined;
  pick_up_point: string | undefined;
  username: string | undefined;
}

interface currentUserCar {
  cars_id: number;
  brand: string;
  model: string;
  type: string;
  passenger_capacity: number;
  transmission: string;
  price_per_day: number;
  mileage: string;
  engine_type: string;
  key_features: string;
  key_rules: string;
  status: string;
  pick_up_point: string;
  username: string;
}

const EditCar: React.FC = () => {
  const classes = useStyles();
  const [user, setUser] = useState<string>();
  const [currentUserCar, setCurrentUserCar] = useState<currentUserCar>();
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValues, setinitialValues] = useState<FormValues>({
    cars_id: undefined,
    brand: undefined,
    model: undefined,
    type: undefined,
    passenger_capacity: undefined,
    transmission: undefined,
    price_per_day: undefined,
    mileage: undefined,
    engine_type: undefined,
    key_features: undefined,
    key_rules: undefined,
    status: undefined,
    pick_up_point: undefined,
    username: undefined,
  });

  useEffect(() => {
    setLoading(true);

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
      setCurrentUserCar(currentUserCarsInfo[0]); // first element in array
      console.log("currentUserCar: ", currentUserCar);

      if (currentUserCar !== undefined) {
        setinitialValues({
          cars_id: currentUserCar?.cars_id,
          brand: currentUserCar?.brand,
          model: currentUserCar?.model,
          type: currentUserCar?.type,
          passenger_capacity: currentUserCar?.passenger_capacity,
          transmission: currentUserCar?.transmission,
          price_per_day: currentUserCar?.price_per_day,
          mileage: currentUserCar?.mileage,
          engine_type: currentUserCar?.engine_type,
          key_features: currentUserCar?.key_features,
          key_rules: currentUserCar?.key_rules,
          status: currentUserCar?.status,
          pick_up_point: currentUserCar?.pick_up_point,
          username: currentUserCar?.username,
        });
      } else {
        console.log("currentUserCar: undefined");
      }
      console.log("initialValues ", initialValues);
      setLoading(false);
    };
    fetchSession();
    // eslint-disable-next-line
  }, [currentUserCar?.username, initialValues?.cars_id]);

  const handleSubmit = (formValue: any) => {
    const carOwner = { username: user };
    let merge = { ...formValue, ...carOwner };
    console.log(merge);
    const updateCarAccount = async () => {
      try {
        const res = await fetch("/cars/" + currentUserCar?.cars_id, {
          method: "PUT",
          body: JSON.stringify(merge),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res);
        alert("Car profile updated succesfully!");
      } catch (error) {
        console.log(error);
      }
    };
    const createCarAccount = async () => {
      try {
        const res = await fetch("/cars/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(merge),
        });
        console.log(res);
        alert("New car profile created succesfully!");
      } catch (error) {
        console.error(error.message);
      }
    };

    if (currentUserCar?.cars_id === undefined) {
      createCarAccount();
    } else {
      updateCarAccount();
    }
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <MultiStepForm
            initialValues={{
              ...initialValues,
            }}
            onSubmit={handleSubmit}
          >
            <FormStep
              stepName="Specs"
              onSubmit={() => console.log("step 1 submit")}
              validationSchema={validation_part_1}
            >
              <Textfield className={classes.field} name="brand" label="Brand" />
              <Textfield className={classes.field} name="model" label="Model" />
              <Textfield
                className={classes.field}
                name="price_per_day"
                label="Price per day"
              />
              <Textfield
                className={classes.field}
                name="mileage"
                label="Mileage"
              />
              <div>
                <InputLabel
                  id="demo-simple-select-outlined-label"
                  style={{
                    fontSize: "12px",
                    paddingLeft: "12px",
                  }}
                >
                  Status
                </InputLabel>
                <Field
                  name="status"
                  type="select"
                  label="status"
                  variant="outlined"
                  fullWidth
                  as={Select}
                >
                  {car_status.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Field>
              </div>
              <div className="Radio-options">
                <div className={classes.field}>
                  Type:
                  <label>
                    <Field name="type" type="radio" value="sport" as={Radio} />
                    Sport
                  </label>
                  <label>
                    <Field name="type" type="radio" value="sedan" as={Radio} />
                    Sedan
                  </label>
                </div>
                <div className={classes.field}>
                  Tranmission:
                  <label>
                    <Field
                      name="transmission"
                      type="radio"
                      value="automatic"
                      as={Radio}
                    />
                    Automatic
                  </label>
                  <label>
                    <Field
                      name="transmission"
                      type="radio"
                      value="manual"
                      as={Radio}
                    />
                    Manual
                  </label>
                </div>
                <div className={classes.field}>
                  Engine Type:
                  <label>
                    <Field
                      name="engine_type"
                      type="radio"
                      value="petrol"
                      as={Radio}
                    />
                    Petrol
                  </label>
                  <label>
                    <Field
                      name="engine_type"
                      type="radio"
                      value="diesel"
                      as={Radio}
                    />
                    Diesel
                  </label>
                  <label>
                    <Field
                      name="engine_type"
                      type="radio"
                      value="hybrid"
                      as={Radio}
                    />
                    Hybrid
                  </label>
                </div>
              </div>
            </FormStep>
            <FormStep
              stepName="Rules"
              onSubmit={() => console.log("step 2 submit")}
              validationSchema={validation_part_2}
            >
              <div>
                <InputLabel
                  id="demo-simple-select-outlined-label"
                  style={{
                    fontSize: "12px",
                    paddingLeft: "12px",
                  }}
                >
                  Passenger capacity
                </InputLabel>
                <Field
                  name="passenger_capacity"
                  type="select"
                  label="passenger_capacity"
                  variant="outlined"
                  fullWidth
                  as={Select}
                >
                  {passenger_cap.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Field>
              </div>
              <Textfield
                className={classes.field}
                name="key_features"
                label="Key features"
                multiline={true}
                rows={4}
              />
              <Textfield
                className={classes.field}
                name="key_rules"
                label="Key rules"
                multiline={true}
                rows={4}
              />
              <Textfield
                className={classes.field}
                name="pick_up_point"
                label="Pickup point"
                multiline={true}
                rows={4}
              />
            </FormStep>
          </MultiStepForm>
        </div>
      )}
    </>
  );
};

export default EditCar;
