import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import "./CounterCards.scss";

interface CounterCardsProps {
  title: string;
  loading?: boolean;
  count: number | string;
  icon: any;
}
const CounterCards = ({ loading, title, count, icon }: CounterCardsProps) => {
  return (
    <div className="counter__card">
      <div className="info__section">
        <p className="title">{title}</p>
        {loading ? (
          <BeatLoader color="#faa41a" />
        ) : (
          <p className="description">{count}</p>
        )}
      </div>
      <div className="icon">{icon}</div>
    </div>
  );
};

export default CounterCards;
