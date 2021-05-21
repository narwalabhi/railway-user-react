import {
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {contactInfoEmail, contactInfoMobile} from "../actions"

const emailRegex = /\S+@\S+\.\S+/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

//   const validateEmail = (event) => {
//     const email = event.target.value;
//     if (emailRegex.test(email)) {
//       setIsValid(true);
//       setMessage('Your email looks good!');
//     } else {
//       setIsValid(false);
//       setMessage('Please enter a valid email!');
//     }
//   };

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "2%",
  },
  title: {
    fontSize: 14,
    color: "black",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "flex-start",
    color: theme.palette.text.secondary,
  },
  input: {
    width: "80%",
  },
}));

const ContactInfo = () => {
  const user = JSON.parse(localStorage.getItem("user")).user;
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobileNumber);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    dispatch(contactInfoEmail(event.target.value));
  };

  const handleMobileChange = (event) => {
    if (event.target.value.length <= 10) {
      setMobile(event.target.value);
      dispatch(contactInfoMobile(event.target.value));
    }
  };

  return (
    <div className={classes.root} spacing={2}>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation="12" variant="outlined">
            <Typography className={classes.title}>contact Info</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Paper className={classes.paper}>
        <Grid container style={{ marginTop: "1%" }}>
          <Grid item xs={6}>
            <TextField
              required
              className={classes.input}
              id="standard-required"
              label="Mobile"
              type="tel"
              value={mobile}
              onChange={handleMobileChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              className={classes.input}

              label="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ContactInfo;
