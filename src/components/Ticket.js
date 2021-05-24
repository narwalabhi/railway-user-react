import { Skeleton } from "@material-ui/lab";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { getStation, getTrain } from "../actions";

const Ticket = () => {
  const ticket = useSelector((state) => {
    console.log(state);
    return state.ticket;
  });
  const train = useSelector((state) => state.train);
  const [from, to] = useSelector((state) => state.stations);
  const token = JSON.parse(localStorage.getItem("user")).jwt;
  const dispatch = useDispatch();

  const getClassName = (value) => {
    switch (value) {
      case "FAC":
        return "First AC(1A)";
      case "SAC":
        return "AC 2 Tier(2A)";
      case "TAC":
        return "AC 3 Tier(3A)";
      case "FC":
        return "First Class";
      case "CC":
        return "AC Chair Car(CC)";
      case "SL":
        return "Sleeper(SL)";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (ticket) {
      dispatch(getStation(ticket.fromStationCode, token));
      dispatch(getStation(ticket.toStationCode, token));
      dispatch(getTrain(ticket.trainNo, token));
    }
    console.log("train" + train);
  }, [ticket]);

  // if (!(from && to && train && ticket)) {
  //   return <Redirect to="/" />;
  // }

  const renderedSeats = () => {
    return ticket.passengers.map((passenger, i) => {
      return (
        <tr>
          <td data-label="Sno">{i + 1}</td>
          <td data-label="Name">{passenger.name}</td>
          <td data-label="Age">{passenger.age}</td>
          <td data-label="Job">{passenger.gender}</td>
          <td data-label="Job">{`${ticket.status.toUpperCase()}/${
            Object.keys(ticket.seats)[0]
          } ${ticket.seats[Object.keys(ticket.seats)[0]][i]}`}</td>
        </tr>
      );
    });
  };

  return (
    <div className="ui container segment middle aligned">
      <h4 className="ui header">Ticket</h4>
      {ticket && from && to && train ? (
        <div className="ui two column celled grid">
          <div className="two column row">
            <div className="column ui sub header">
              {`Train Name & No: ${train.name} | ${train.number}`}
            </div>
            <div className="column ui sub header right aligned">
              {`PNR: ${ticket.pnr}`}
            </div>
          </div>
          <div className="two column row">
            <div className="column ui sub header">
              {`Class: ${getClassName(Object.keys(ticket.seats)[0])}`}
            </div>
            <div className="column ui sub header right aligned">
              {`Date of Journey: ${ticket.journeyDate}`}
            </div>
          </div>
          <div className="three column row">
            <div className="column ui sub header">{`From: ${from.name}`}</div>
            <div className="column ui sub header center aligned">
              {`To: ${to.name}`}
            </div>
            <div className="column ui sub header right aligned">
              {`Distance: ${train.distance} Km`}
            </div>
          </div>
          <div className="three column row">
            <div className="column ui sub header">{`Departure: ${train.departure}`}</div>
            <div className="column ui sub header center aligned">
              {`Arrival: ${train.arrival}`}
            </div>
            <div className="column ui sub header right aligned">
              {`Duration: ${train.durationHrs} Hr ${train.durationMns} Min`}
            </div>
          </div>
        </div>
      ) : (
        <Skeleton variant="rect" width={"100%"} height={160} />
      )}
      <h5 className="ui header">Passenger Details</h5>
      {ticket && from && to && train ? (
        <table className="ui celled table">
          <thead>
            <tr>
              <th>SNO.</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Booking Status/Seat No</th>
            </tr>
          </thead>
          <tbody>{renderedSeats()}</tbody>
        </table>
      ) : (
        <Skeleton variant="rect" width={"100%"} height={80} />
      )}
    </div>
  );
};

export default Ticket;
