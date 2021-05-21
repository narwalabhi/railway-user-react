import {
  Box,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "2%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "flex-start",
    color: theme.palette.text.secondary,
  },
  paperCenter: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    fontSize: 14,
    color:'black'
  },
  paperEnd: {
    padding: theme.spacing(2),
    textAlign: "right",
    color: theme.palette.text.secondary,
  },
}));

const BookingInfo = (props) => {
  const classes = useStyles();

  const { tripSchedule, train, fromStation, toStation, selectedClass } = props;
 const getFromText = (time, name, date) => {
    return time + " | " + name + " | " + date;
  };

  const getDuration = (hrs, mns) => {
    return hrs + " hrs " + mns + "mns";
  };

  const getClassName = (className) => {
    switch (className) {
      case "FAC":
        return "1AC";
      case "SAC":
        return "2AC";
      case "TAC":
        return "3AC";
      default:
        return className;
    }
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation="12" variant="outlined">
            <Typography className={classes.title} omponent="subtitle1" color="textSecondary">
              {train.name}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Divider />
      <Paper>
        {" "}
        <Grid container>
          <Grid item xs={5}>
            <Paper className={classes.paper} elevation="0" square>
              <Typography className={classes.title} omponent="subtitle1" color="textSecondary">
                {getFromText(
                  train.departure,
                  fromStation.name,
                  tripSchedule.tripDate
                )}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paperCenter} elevation="0" square>
              <Typography className={classes.title} omponent="subtitle1" color="textSecondary">
                {getDuration(train.durationHrs, train.durationMns)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper className={classes.paperEnd} elevation="0" square>
              <Typography className={classes.title} omponent="subtitle1" color="textSecondary">
                {getFromText(
                  train.arrival,
                  toStation.name,
                  tripSchedule.tripDate
                )}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paperCenter} elevation="0" square>
              <Typography className={classes.title} omponent="subtitle1" color="textSecondary">
                {getClassName(selectedClass)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default BookingInfo;
