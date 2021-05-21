import React, { useEffect, useState } from "react";
import { makeStyles, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";

const useStyles = makeStyles((theme)=>({
  autocomplete: {
    width: "100%"
  }
}))
const StationAutoComplete = (props) => {
  const classes = useStyles();
  const { handleStationSelect, label, from } = props;
  const [stations, setStations] = useState([]);
  const [term, setTerm] = useState("");

  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  useEffect(() => {
    const search = async () => {
      const res = await axios.get(
        `http://localhost:8082/train/stations/search/${term}`
      );
      setStations(res.data);
      console.log(res.data);
    };
    const timeoutId = setTimeout(() => {
      if (term && term.length > 1) search();
      else {
        setStations([]);
        handleStationSelect(null, from);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  return (
    <div>
      <Autocomplete
        className={classes.autocomplete}
        onChange={(event, value) => handleStationSelect(value, from)}
        id="free-solo-2-demo"
        disableClearable
        options={stations}
        size="small"
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            required
            // margin="normal"
            variant="outlined"
            value={term}
            onChange={handleTermChange}
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
      />
    </div>
  );
};

export default StationAutoComplete;
