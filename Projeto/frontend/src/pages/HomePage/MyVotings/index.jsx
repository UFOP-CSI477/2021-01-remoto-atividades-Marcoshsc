import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getVotings } from "../../../redux/votings/actions";
import { selectVotings } from "../../../redux/votings/selectors";
import VotingCard from "../VotingCard";
import "./styles.scss";

// const votings = [
//   {
//     title: "Titulo da votacao",
//     open: true,
//     numberOfVoters: 22,
//     start: "11/12/2021",
//     end: "24/12/2021",
//   },
//   {
//     title: "Titulo da votacao",
//     open: true,
//     numberOfVoters: 22,
//     start: "11/12/2021",
//     end: "24/12/2021",
//   },
//   {
//     title: "Titulo da votacao",
//     open: true,
//     numberOfVoters: 22,
//     start: "11/12/2021",
//     end: "24/12/2021",
//   },
//   {
//     title: "Titulo da votacao",
//     open: true,
//     numberOfVoters: 22,
//     start: "11/12/2021",
//     end: "24/12/2021",
//   },
// ];

const MyVotings = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const votings = useSelector(selectVotings)

  useEffect(() => {
    dispatch(getVotings()) 
  }, [dispatch])

  const handleNewVoting = () => {
    navigate('/voting/new')
  }

  return (
    <div className="my-votings__container">
      <div className="my-votings__title-and-new">
        <h3>Minhas votações</h3>
        <button onClick={handleNewVoting}>Criar votação</button>
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
