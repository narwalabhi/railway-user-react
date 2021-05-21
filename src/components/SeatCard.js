import React from "react";
import { Link } from "react-router-dom";

const SeatCard = ({ value, seatsCount, handleClick }) => {
  const getHeader = () => {
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

  return (
    <div className="ui card">
      <div className="content">
        <div className="ui header">{getHeader()}</div>
      </div>
      <div className="content">
        <div className="ui sub header">{`AVL-${seatsCount}`}</div>
      </div>
      <div class="extra content">
        <Link to="/booking">
          <button class="ui button" onClick={() => handleClick(value)}>Book Now</button>
        </Link>
      </div>
    </div>
  );
};

export default SeatCard;
