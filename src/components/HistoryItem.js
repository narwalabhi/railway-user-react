import { Skeleton } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { getStation } from "../actions";
import auth from "../apis/auth";

const HistoryItem = ({ ticket }) => {
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [train, setTrain] = useState();
  const dateOfJourney = new Date(ticket.journeyDate);
  const dateOfBooking = new Date(ticket.bookingDate);
  const token = JSON.parse(localStorage.getItem("user")).jwt;

  const getStation = async (isFrom) => {
    const code = isFrom ? ticket.fromStationCode : ticket.toStationCode;
    const response = await auth.get(`/train/stations/get/${code}`, {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    if(isFrom){
      setFrom(response.data);
    }else{
      setTo(response.data);
    }
    console.log(from);
  };

  const getTrain =async () => {
    const response = await auth.get(`/train/get/${ticket.trainNo}`, {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    setTrain(response.data);
  }

  useEffect(() => {
    getStation(true);
    getStation(false);
    getTrain();
  }, [ticket]);

  const getDay = (day) => {
    switch (day) {
      case 0:
        return "Monday";
      case 1:
        return "Tuesday";
      case 2:
        return "Wednesday";
      case 3:
        return "Thursday";
      case 4:
        return "Friay";
      case 5:
        return "Staurday";
      case 6:
        return "Sunday";
      default:
        return "";
    }
  };

  return (
    <div className="ui segment" style={{ width: "100%" }}>
      <div className="ui internally celled grid">
        <div className="row">
          <div className="three wide column" style={{ height: "100%" }}>
            <div className="ui grid">
              <div className="row">
                <div className="sixteend wide column center aligned">
                  <span className="ui header">{getDay(dateOfJourney.getDay())}</span>
                </div>
              </div>
              <div className="two column row">
                <div className="column">
                  <span className="ui header">{dateOfJourney.getDate()}</span>
                </div>
                <div className="column left aligned" style={{padding:'0'}}>
                  <span className="ui header">{`${dateOfJourney.toLocaleString("default", {
                    month: "long",
                  })} ${dateOfJourney.getFullYear()}`}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="thirteen wide column">
            { (from && to && train) ? <div className="ui two column grid">
              <div className="row">
                <div className="column">{`PNR: ${ticket.pnr}`}</div>
                <div className="column">{`Train No: ${ticket.trainNo}`}</div>
              </div>
              <div className="row">
                <div className="column">{`Train Name: ${train && train.name}`}</div>
                <div className="column">{`Booking Date: ${dateOfBooking.toDateString()}`}</div>
              </div>
              <div className="row">
                <div className="column">{`From: ${from && from.name}`}</div>
                <div className="column">{`To: ${to && to.name}`}</div>
              </div>
            </div> : <Skeleton variant="rect" width={'100%'} height={'100%'}/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
