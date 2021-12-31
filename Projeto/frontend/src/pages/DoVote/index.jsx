import React, { useState } from "react";
import CandidateCard from "../VotingPage/CandidateCard";
import "./styles.scss";

const candidate = {
  name: "Julia Trule",
  avatar:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
};

const DoVote = () => {
  const [confirm, setConfirm] = useState();

  const handleClick = (candidate) => {
    return () => {
      setConfirm(candidate);
    };
  };

  const handleCancel = () => {
    setConfirm(undefined)
  }

  return (
    <div className="do-vote__container">
      <h2>Votar</h2>
      {confirm ? (
        <>
        <h3 className="do-vote__confirm__message">Deseja mesmo votar em {confirm.name}?</h3>
        <div className="do-vote__confirm__candidate">
          <CandidateCard candidate={confirm} />
        </div>
        <div className="do-vote__confirm__actions">
          <button>Confirmar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>
        </>
      ) : (
        <>
          <h3>Selecione o candidato que quer votar.</h3>
          <div className="do-vote__candidates">
            <CandidateCard onClick={handleClick(candidate)} candidate={candidate} />
            <CandidateCard onClick={handleClick(candidate)} candidate={candidate} />
            <CandidateCard onClick={handleClick(candidate)} candidate={candidate} />
            <CandidateCard onClick={handleClick(candidate)} candidate={candidate} />
            <CandidateCard onClick={handleClick(candidate)} candidate={candidate} />
          </div>
        </>
      )}
    </div>
  );
};

export default DoVote;
