import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  Select,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { MenuItem, Paper } from "@material-ui/core";
import React, { useState } from "react";
import StationAutoComplete from "./StationAutoComplete";
import { Search } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { searchTrips } from "../actions/index";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  date: {
    marginTop: theme.spacing(1),
  },
  button: {
    marginLeft: theme.spacing(3),
  },
}));

const SearchForm = ({ history }) => {
  const classes = useStyles();
  const [fromSelectedStation, setFromSelectedStation] = useState(null);
  const [toSelectedStation, setToSelectedStation] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();

  const handleStationSelect = (station, from) => {
    if (from) setFromSelectedStation(station);
    else setToSelectedStation(station);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
    console.log(event.target.value);
  };

  const handleDateChange = (date) => {
    if (date) {
      console.log(date.getUTCDate());
      setSelectedDate(date);
    }
  };

  const getDate = () => {
    const date = new Date(selectedDate);
    return `${date.getFullYear()}-${
      (date.getMonth() > 9 ? "" : "0") + date.getMonth()
    }-${(date.getDate() > 9 ? "" : 0) + date.getDate()}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit" + selectedDate.toUTCString());
    dispatch(
      searchTrips(fromSelectedStation.code, toSelectedStation.code, getDate())
    );
    localStorage.setItem("from", JSON.stringify(fromSelectedStation));
    localStorage.setItem("to", JSON.stringify(toSelectedStation));
    history.push("/search-result");
  };

  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit}>
        <div className="ui two column grid">
          <div className="row">
            <div className="column">
              <StationAutoComplete
                label="From"
                handleStationSelect={handleStationSelect}
                from={true}
              />
            </div>
            <div className="column">
              <StationAutoComplete
                label="To"
                handleStationSelect={handleStationSelect}
                from={false}
              />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  required
                  disablePast
                  fullWidth
                  className={classes.date}
                  disableToolbar
                  variant="inline"
                  format="yyyy/MM/dd"
                  margin="normal"
                  id="tripDate"
                  placeholder="YYYY-MM-DD"
                  label="Trip Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className="column">
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="demo-simple-select-label">Class</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedClass}
                  onChange={handleClassChange}
                >
                  <MenuItem value="all">All Classes</MenuItem>
                  <MenuItem value="FAC">1 AC</MenuItem>
                  <MenuItem value="SAC">2 AC</MenuItem>
                  <MenuItem value="TAC">3 AC</MenuItem>
                  <MenuItem value="FC">First Class</MenuItem>
                  <MenuItem value="CC">Chair Car</MenuItem>
                  <MenuItem value="SL">Sleeper</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="centered column">
            {/* <Link to="/search-result"> */}
            <Button
              type="submit"
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<Search />}
              // onClick={handleSubmit}
            >
              Search
            </Button>
            {/* </Link> */}
          </div>
        </div>
      </form>
    </Paper>
  );
};

export default SearchForm;
