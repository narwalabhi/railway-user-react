import React from "react";
import HistoryItem from "./HistoryItem";

const HistoryList = ({tickets}) => {
  const getJourneys = () =>
    tickets.map((ticket) => {
      console.log(ticket)
      return <HistoryItem ticket={ticket} key={ticket.ticketId}/>;
    });

  return <div className="ui celled list">{getJourneys()}</div>;
};

export default HistoryList;
