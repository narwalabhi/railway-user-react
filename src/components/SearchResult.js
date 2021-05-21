import React from "react";
import { useSelector } from "react-redux";
import TripItem from "./TripItem";

const SearchResult = () => {
  const trips = useSelector((state) => {
    console.log(state);
    return state.trips;
  });
  const from = JSON.parse(localStorage.getItem("from"));
  const to = JSON.parse(localStorage.getItem("to"));

  console.log(trips);

  const renderedItems = trips.map((trip) => {
    return <TripItem trip={trip} key={trip.tripId} from={from} to={to} />;
  });

  return (
    <div className="ui container">
      <div className="ui header" style={{ marginTop: "2% " }}>
        <h5 className="header">{`${trips.length} Result${
          trips.length > 1 ? "s" : ""
        } for ${from.name} => ${to.name}`}</h5>
      </div>
      <div className="ui relaxed divided list">{renderedItems}</div>
    </div>
  );
};

export default SearchResult;
