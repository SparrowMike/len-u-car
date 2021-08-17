import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  Paper,
  Container,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import Cars from "../components/cars/Cars";
import axios from "axios";
import { useQuery } from "react-query";

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
  }[]; //array of objects
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

  //const [users, setUsers] = React.useState<IState["users"]>(data);

  const handleCarType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCarType(event.target.value as string);
  };
  const handleTransmission = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTransmission(event.target.value as string);
  };
  const handleEngineType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEngineType(event.target.value as string);
  };

  const fetchUsers = async () => {
    const { data } = await axios.get("http://localhost:4000/users");
    return data;
  };

  const { isLoading, isSuccess, error, isError, data } = useQuery(
    "users",
    fetchUsers
  );
  //  setUsers(data);
  // console.log(data);
  // console.log(typeof data);
  // const d = data;
  // console.log(d?.[1]);
  // console.log(typeof d);

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
                  onChange={handleCarType}
                  label="Type"
                >
                  <MenuItem value="sport">Sport</MenuItem>
                  <MenuItem value="suv">SUV</MenuItem>
                  <MenuItem value="avant">Avant</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Transmit</InputLabel>
                <Select
                  id="transmission"
                  value={transmission}
                  onChange={handleTransmission}
                  label="Transmit"
                >
                  <MenuItem value="auto">Auto</MenuItem>
                  <MenuItem value="manual">Manual</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Engine</InputLabel>
                <Select
                  id="engineType"
                  value={engineType}
                  onChange={handleEngineType}
                  label="Engine"
                >
                  <MenuItem value="petrol">Petrol</MenuItem>
                  <MenuItem value="diesel">Diesel</MenuItem>
                  <MenuItem value="hybrid">Hybrid</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      {isLoading ? <h1>Loading data</h1> : <Cars users={data} />}
    </>
  );
};

export default Browse;
