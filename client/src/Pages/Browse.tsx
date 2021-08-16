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
import axios from 'axios';
import { useQuery } from "react-query";

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

  const handleCarType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCarType(event.target.value as string);
  };
  const handleTransmission = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTransmission(event.target.value as string);
  };
  const handleEngineType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEngineType(event.target.value as string);
  };

  // console.log(carType);
  // console.log(transmission);
  // console.log(engineType);

  const fetchUsers = async () => {
    const { data } = await axios.get(
      'http://localhost:4000/users'
    );
    return data;
  };

  const {  isLoading, 
           isSuccess, 
           error, 
           isError, 
           data} = useQuery("users", fetchUsers)
  
           console.log(data);
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
      <Cars />
    </>
  );
};

export default Browse;
