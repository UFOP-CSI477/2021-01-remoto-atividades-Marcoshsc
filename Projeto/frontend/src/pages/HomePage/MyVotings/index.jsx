import React from "react";
import VotingCard from "../VotingCard";
import "./styles.scss";

const votings = [
  {
    title: "Titulo da votacao",
    open: true,
    numberOfVoters: 22,
    startDate: "11/12/2021",
    endDate: "24/12/2021",
  },
  {
    title: "Titulo da votacao",
    open: true,
    numberOfVoters: 22,
    startDate: "11/12/2021",
    endDate: "24/12/2021",
  },
  {
    title: "Titulo da votacao",
    open: true,
    numberOfVoters: 22,
    startDate: "11/12/2021",
    endDate: "24/12/2021",
  },
  {
    title: "Titulo da votacao",
    open: true,
    numberOfVoters: 22,
    startDate: "11/12/2021",
    endDate: "24/12/2021",
  },
];

const MyVotings = () => {
  return (
    <div className="my-votings__container">
      <div className="my-votings__title-and-new">
        <h3>Minhas votações</h3>
        <button>Criar votação</button>
      </div>
      <div className="my-votings__votings-container">
        {votings.map((el, idx) => (
          <VotingCard key={idx} voting={el}/>
        ))}
      </div>
    </div>
  );
};

export default MyVotings;
