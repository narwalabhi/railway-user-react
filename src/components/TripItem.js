import React, { useEffect, useState } from "react";
import auth from "../apis/auth";
import SeatCard from "./SeatCard";

const TripItem = ({ trip, from, to }) => {
  const [train, setTrain] = useState({});
  const { jwt } = JSON.parse(localStorage.getItem("user"));

  const loadTrain = async () => {
    const response = await auth.get(`/train/get/${trip.trainNo}`, {
      //   mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    });
    setTrain(response.data);
  };

  useEffect(() => {
    loadTrain();
  }, []);

  const bookNow = (classType) => {
    localStorage.setItem("selectedClass", classType);
    localStorage.setItem("tripSchedule", JSON.stringify(trip));
    localStorage.setItem("train", JSON.stringify(train));
  };

  console.log(trip);
  return (
    <div className="item ui grid segment">
      <div className="row content ui dividing header">
        <div className="eight wide column">
          {train && `${train.name}(${trip.trainNo})`}
        </div>
        <div className="eight wide column right aligned">
          Runs On: M T W T F S S
        </div>
      </div>
      <br />
      <div className="row" style={{ padding: "0", margin: "0" }}>
        <div className="seven wide column ui sub header">{`${train.departure} | ${from.name} | ${trip.tripDate}`}</div>
        <div className="three wide column center ui aligned sub header">
          ----{`${train.durationHrs} hrs ${train.durationMns} mns----`}
        </div>
        <div className="six wide column right aligned content ui sub header">{`${train.arrival} | ${to.name} | ${trip.tripDate}`}</div>
      </div>
      <br />
      <div className="row">
        <div className="three wide column">
          <SeatCard
            value={"FAC"}
            handleClick={bookNow}
            seatsCount={trip.sleeperAvailableSeats}
          />
        </div>
        <div className="three wide column">
          <SeatCard
            value={"SAC"}
            handleClick={bookNow}
            seatsCount={trip.secondAcAvailableSeats}
          />
        </div>
        <div className="three wide column">
          <SeatCard
            value={"TAC"}
            handleClick={bookNow}
            seatsCount={trip.firstAcAvailableSeats}
          />
        </div>
        <div className="three wide column">
          <SeatCard
            value={"CC"}
            handleClick={bookNow}
            seatsCount={trip.chairCarAcAvailableSeats}
          />
        </div>
        <div className="three wide column">
          <SeatCard
            value={"SL"}
            handleClick={bookNow}
            seatsCount={trip.sleeperAvailableSeats}
          />
        </div>
      </div>
    </div>
  );
};

export default TripItem;
