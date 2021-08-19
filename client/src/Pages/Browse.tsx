import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Cars from "../components/cars/Cars";

export interface IState {
  users: {
    avatar: string;
    brand: string;
    cars_id: number;
    cloudinary_id: string;
    driving_license: string;
    email: string;
    engine_type: string;
    full_name: string;
    identification_card: string;
    images_id: number;
    key_features: string;
    key_rules: string;
    mileage: string;
    mobile: number;
    model: string;
    passenger_capacity: number;
    password: string;
    pick_up_point: string;
    price_per_day: number;
    secure_url: string;
    status: string;
    transmission: string;
    type: string;
    user_id: number;
    user_type: string;
    username: string;
  }[];
  carType?: string;
  transmission?: string;
  engineType?: string;
}

const useStyles = makeStyles((theme) => ({
  main: {
    padding: theme.spacing(2),
    textAlign: "center",
    borderRadius: "10px",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "70px",
  },
}));

const Browse = () => {
  const classes = useStyles();
  const [carType, setCarType] = useState<string>("");
  const [transmission, setTransmission] = useState<string>("");
  const [engineType, setEngineType] = useState<string>("");

  const fetchUsers = async () => {
    const { data } = await axios.get("/users");
    return data;
  };

  const { isLoading, data } = useQuery("users", fetchUsers);
  const typeCar = data
    ?.map((item: any) => item.type)
    .filter(
      (value: any, index: any, self: any) => self.indexOf(value) === index
    );

  const transmissionCar = data
    ?.map((item: any) => item.transmission)
    .filter(
      (value: any, index: any, self: any) => self.indexOf(value) === index
    );
  const engineTypeCar = data
    ?.map((item: any) => item.engine_type)
    .filter(
      (value: any, index: any, self: any) => self.indexOf(value) === index
    );

  typeCar?.push("");
  transmissionCar?.push("");
  engineTypeCar?.push("");
  return (
    <>
      <Container className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.main}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select
                  id="carType"
                  value={carType}
                  label="Type"
                  onChange={(e) => {
                    setCarType(e.target.value as string);
                  }}
                >
                  {typeCar?.map((item: any) => (
                    <MenuItem value={item}>
                      {item === "" ? "ANY" : item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Transmit</InputLabel>
                <Select
                  id="transmission"
                  value={transmission}
                  label="Transmit"
                  onChange={(e) => {
                    setTransmission(e.target.value as string);
                  }}
                >
                  {transmissionCar?.map((item: any) => (
                    <MenuItem value={item}>
                      {item === "" ? "ANY" : item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Engine</InputLabel>
                <Select
                  id="engineType"
                  value={engineType}
                  label="Engine"
                  onChange={(e) => {
                    setEngineType(e.target.value as string);
                  }}
                >
                  {engineTypeCar?.map((item: any) => (
                    <MenuItem value={item}>
                      {item === "" ? "ANY" : item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      {isLoading ? (
        <h1>Loading data</h1>
      ) : (
        <Cars
          users={data}
          carType={carType}
          transmission={transmission}
          engineType={engineType}
        />
      )}
    </>
  );
};

export default Browse;
