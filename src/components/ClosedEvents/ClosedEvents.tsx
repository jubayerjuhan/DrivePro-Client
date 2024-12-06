import React from "react";
import "./ClosedEvents.scss";
import ClosedEventsList from "../ClosedEventsList/ClosedEventsList";

const ClosedEvents = () => {
  return (
    <div className="closed__event">
      <h4 className="header">Closed Events</h4>
      <ClosedEventsList />
    </div>
  );
};

export default ClosedEvents;
