import React, { useState, useEffect } from "react";
import { Formik, Field } from "formik";
import * as yup from "../../../node_modules/yup";
import Button from "@material-ui/core/Button";
import Textfield from "../editProfile/FormsUI/Textfield";
import Radio from "@material-ui/core/Radio";
import { makeStyles, CircularProgress } from "@material-ui/core";
import Cookies from "js-cookie";

const useStyles = makeStyles({
  form: {
    marginTop: 20,
  },
  field: {
    marginTop: 10,
  },
  footer: {
    marginTop: 40,
    paddingBottom: 40,
  },
});

const validationSchema = yup.object({
  brand: yup.string().required("Brand is required"),
  model: yup.string().required("Model is required"),
  type: yup.string().required("Type is required"),
  passenger_capacity: yup
    .number()
    .required("Passenger capacity is required")
    .positive()
    .integer(),
  price_per_day: yup
    .number()
    .required("Price (S$) per day is required")
    .positive()
    .integer(),
  mileage: yup.string().required("Mileage is required"),
  engine_type: yup.string().required("Engine type is required"),
  key_features: yup.string().required("Key features are required"),
  key_rules: yup.string().required("Key rules are required"),
  status: yup.string().required("Status is required"),
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

// const INITIAL_FORM_STATE: FormValues = {
//   brand: "Aston Martin",
//   model: "DB11",
//   type: "sport",
//   passenger_capacity: 4,
//   transmission: "automatic",
//   price_per_day: 9999,
//   mileage: "10000",
//   engine_type: "petrol",
//   key_features: "GPS",
//   key_rules: "No driving to malaysia",
//   status: "available",
//   pick_up_point: "AMK mrt",

//   cars_id: 9999,
//   username: "testusername"
// };

const EditCar: React.FC = () => {
  const classes = useStyles();
  // const currentCar = "3"; // temporary, to remove

  const [currentUserCar, setCurrentUserCar] = useState<currentUserCar>();
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValues, setinitialValues] = useState<FormValues>({
    cars_id: 999999,
    brand: "",
    model: "",
    type: "",
    passenger_capacity: 0,
    transmission: "",
    price_per_day: 0,
    mileage: "",
    engine_type: "",
    key_features: "",
    key_rules: "",
    status: "",
    pick_up_point: "",
    username: "",
  });

  useEffect(() => {
    setLoading(true);

    const fetchSession = async () => {
      // retrieve session ID from custom cookie
      const sidfromCookie = Cookies.get("cook");
      console.log(sidfromCookie);

      const res = await fetch(
        `http://localhost:4000/sessions/check/${sidfromCookie}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      console.log("check useEffect server response", data.sessionDetails);
      const currentUserCarsInfo = data.sessionDetails.currentUserCars;
      console.log("currentUser Data from Redis:", currentUserCarsInfo);
      console.log(typeof currentUserCarsInfo);

      setCurrentUserCar(currentUserCarsInfo[0]); // first element in array
      console.log(currentUserCar);

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
      console.log("initialValues ", initialValues);

      if (currentUserCar?.username === undefined) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    };
    fetchSession();
  }, [currentUserCar?.username, initialValues?.cars_id]);

  const handleSubmit = (formValue: any) => {
    // const userImageURL = { image: displayImageUser };
    let merge = { ...formValue };
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
        //  const data = await res.json();
        console.log(res);
        alert("Car profile updated succesfully!");
      } catch (error) {
        console.log(error);
      }
    };
    updateCarAccount();
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <Formik
            // initialValues={{
            //   ...INITIAL_FORM_STATE,
            // }}
            initialValues={{
              ...initialValues,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <Textfield
                  className={classes.field}
                  id="brand"
                  name="brand"
                  label="Brand"
                />
                <Textfield
                  className={classes.field}
                  id="model"
                  name="model"
                  label="Model"
                />
                {/* <Textfield
                  id="type"
                  name="type"
                  label="Type"
                /> */}
                <div>
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
                <Textfield
                  className={classes.field}
                  id="passenger_capacity"
                  name="passenger_capacity"
                  label="Passenger_capacity"
                />

                {/* <Textfield
                  id="transmission"
                  name="transmission"
                  label="Transmission"
                /> */}
                <div>
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
                <Textfield
                  className={classes.field}
                  id="price_per_day"
                  name="price_per_day"
                  label="Price_per_day"
                />

                <Textfield
                  className={classes.field}
                  id="mileage"
                  name="mileage"
                  label="Mileage"
                />

                {/* <Textfield
                  id="engine_type"
                  name="engine_type"
                  label="Engine_type"
                /> */}
                <div>
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

                <Textfield
                  className={classes.field}
                  id="key_features"
                  name="key_features"
                  label="Key_features"
                />

                <Textfield
                  className={classes.field}
                  id="key_rules"
                  name="key_rules"
                  label="Key_rules"
                />

                <Textfield
                  className={classes.field}
                  id="status"
                  name="status"
                  label="Status"
                />

                <Textfield
                  className={classes.field}
                  id="pick_up_point"
                  name="pick_up_point"
                  label="Pick_up_point"
                />

                <Button
                  className={classes.form}
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
      )}
    </>
  );
};

export default EditCar;
