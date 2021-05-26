import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { green } from "@material-ui/core/colors";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import { PinDropSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const Register = (props) => {
  const classes = useStyles();

  const [gender, setGender] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState();
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    switch (event.target.name) {
      case "firstName":
        setFirstName(event.target.value);
        break;
      case "lastName":
        setLastName(event.target.value);
        break;
      case "mobile":
        setMobile(event.target.value);
        break;
      case "email":
        console.log(event.target.value);
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "gender":
        setGender(event.target.value);
        break;
      default:
        return;
    }
    // setGender(event.target.value);
    console.log(event.target.name);
  };
  const getDate = () => {
    const date = new Date(dob);
    return `${date.getFullYear()}-${
      (date.getMonth() > 9 ? "" : "0") + date.getMonth()
    }-${(date.getDate() > 9 ? "" : 0) + date.getDate()}`;
  };

  const handleDobChange = (date) => {
    console.log(date);
    setDob(date);
  };

  const register = () => {
    setLoading(true);
    console.log(password);
    const response = axios
      .post("http://localhost:8081/user/signup", {
        firstName,
        lastName,
        email,
        mobileNumber: mobile,
        password,
        roles: "user",
        dob: getDate(),
        gender,
      })
      .then((response) => {
        setLoading(false);
        if (response.data.message) {
          console.log("failed");
        } else {
          props.history.push("/login");
        }
      });

    console.log(response.data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                value={firstName}
                onChange={handleChange}
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                required
                variant="outlined"
                fullWidth
                name="gender"
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={gender}
                onChange={handleChange}
                label="Gender"
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"others"}>Others</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  required={true}
                  disableFuture
                  fullWidth
                  className={classes.date}
                  format="yyyy/MM/dd"
                  margin="normal"
                  id="dob"
                  placeholder="YYYY-MM-DD"
                  label="DOB"
                  value={dob}
                  onChange={handleDobChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                error={!isNaN(mobile) ? false : true}
                type="tel"
                fullWidth
                id="mobile"
                label="Mobile"
                name="mobile"
                helperText={
                  !isNaN(mobile)
                    ? ""
                    : "Mobile number should onl contain digits"
                }
                value={mobile}
                autoComplete="none"
                onChange={handleChange}
                inputProps={{
                  maxLength: 10,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                type="email"
                fullWidth
                label="Email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                value={password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
          <Grid container justify="flex-end">
            <Grid item>Already have an account? Sign in</Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default Register;
