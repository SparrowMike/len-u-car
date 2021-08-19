import { Container, makeStyles, Theme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useQuery } from "react-query";
import Booking from "./Booking";
import ChangePassword from "./ChangePassword";
import EditCar from "./EditCar";
import UpdateProfile from "./UpdateProfile";
import UploadCars from "./UploadCars";
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    minHeight: "400px",
    maxHeight: "auto",
    borderRadius: "10px",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  container: {
    maxWidth: "750px",
  },
}));
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export interface IState {
  user: {
    user_id: number;
    username: string;
    password: string;
    full_name: string;
    email: string;
    avatar: string;
    user_type: string;
    mobile: number;
    identification_card: string;
    driving_license: string;
    cloudinary_id: string;
  };
  carinfo: {
    cars_id: number;
    brand: string;
    engine_type: string;
    key_features: string;
    key_rules: string;
    mileage: string;
    model: string;
    passenger_capacity: number;
    pick_up_point: string;
    price_per_day: number;
    status: string;
    transmission: string;
    type: string;
    username: string;
  };
}

export default function Edit() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const sidfromCookie = Cookies.get("cook");
  if (sidfromCookie === undefined) console.log("No cookie available."); // +

  const fetchUsers = async () => {
    const { data } = await axios.get(`/sessions/check/${sidfromCookie}`);
    return data;
  };

  const { data: data1 } = useQuery("sessions/check", fetchUsers);
  const user = data1?.sessionDetails.currentUser;
  const carinfo = data1?.sessionDetails.currentUserCars[0];

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="my info" {...a11yProps(0)} />
        <Tab label="my car " {...a11yProps(1)} />
        <Tab label="car images" {...a11yProps(2)} />
        <Tab label="password" {...a11yProps(3)} />
        <Tab label="booking" {...a11yProps(4)} />
      </Tabs>
      <Container className={classes.container}>
        <TabPanel value={value} index={0}>
          <UpdateProfile />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <EditCar />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <UploadCars carinfo={carinfo} user={user} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ChangePassword />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Booking user={user} />
        </TabPanel>
      </Container>
    </div>
  );
}
