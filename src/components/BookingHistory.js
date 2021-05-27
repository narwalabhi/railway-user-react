import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import HistoryItem from "./HistoryItem";
import HistoryList from "./HistoryList";
import { useDispatch, useSelector } from "react-redux";
import { getTicketsByUser } from "../actions";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const BookingHistory = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const tickets = useSelector((state) => state.tickets);
  const dateNow = new Date();
  const noTripMessage = "No Trips Found";
  const { jwt, user } = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTicketsByUser(user.id, jwt));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const upComingTrips = tickets
    .filter(
      (ticket) => new Date(ticket.journeyDate).getTime() >= dateNow.getTime()
    )
    .sort(
      (a, b) =>
        new Date(b.journeyDate).getTime() - new Date(a.journeyDate).getTime()
    );

  const prevTrips = tickets
    .filter(
      (ticket) => new Date(ticket.journeyDate).getTime() <= dateNow.getTime()
    )
    .sort(
      (a, b) =>
        new Date(b.journeyDate).getTime() - new Date(a.journeyDate).getTime()
    );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="simple tabs example"
        >
          <Tab label="Upcoming Trips" {...a11yProps(0)} />
          <Tab label="All Trips" {...a11yProps(1)} />
          <Tab label="Past Trips" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {upComingTrips.length > 0 ? (
          <HistoryList tickets={upComingTrips} />
        ) : (
          noTripMessage
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {tickets.length > 0 ? <HistoryList tickets={tickets} /> : noTripMessage}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {prevTrips.length > 0 ? (
          <HistoryList tickets={prevTrips} />
        ) : (
          noTripMessage
        )}
      </TabPanel>
    </div>
  );
};

export default BookingHistory;
