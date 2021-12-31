import React from "react";
import "./styles.scss";

const CandidateCard = ({ candidate, onClick }) => {
  return (
    <div
      className={`candidate-card__container${onClick ? " candidate-card__point-hover" : ""}`}
      onClick={onClick}
    >
      <img src={candidate.avatar} alt={candidate.name} />
      <p>{candidate.name}</p>
    </div>
  );
};

export default CandidateCard;
