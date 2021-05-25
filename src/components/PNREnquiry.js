import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Ticket from "./Ticket";
import { useDispatch, useSelector } from "react-redux";
import { getTicketByPNR } from "../actions";

const PNREnquiry = () => {
  const [pnr, setPnr] = useState("");
  const [loading, setLoading] = useState(true);
  const ticket = useSelector((state) => state.ticket);
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("user")).jwt;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(pnr);
    dispatch(getTicketByPNR(pnr, token));
    setLoading(false);
    console.log(ticket);
  };

  const handlePnrChange = (event) => {
    setPnr(event.target.value);
    setLoading(true);
  };

  return (
    <div className="ui container" style={{marginTop:'2%'}}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="PNR"
          value={pnr}
          onChange={handlePnrChange}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
      {!loading && <Ticket />}
    </div>
  );
};

export default PNREnquiry;
