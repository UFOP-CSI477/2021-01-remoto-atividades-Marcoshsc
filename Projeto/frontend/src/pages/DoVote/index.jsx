import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getCurrentUser } from "../../redux/auth/selectors";
import { selectVoting, vote } from "../../redux/votings/actions";
import { getSelectedVoting, getSelectedVotingError, getSelectedVotingLoading } from "../../redux/votings/selectors";
import CandidateCard from "../VotingPage/CandidateCard";
import "./styles.scss";

const DoVote = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [confirm, setConfirm] = useState();

  const voting = useSelector(getSelectedVoting)
  const currentUser = useSelector(getCurrentUser)
  const loading = useSelector(getSelectedVotingLoading)
  const { error, message } = useSelector(getSelectedVotingError)

  useEffect(() => {
    if(currentUser) {
      dispatch(selectVoting(id))
    }
  }, [id, dispatch, currentUser])

  const handleClick = (candidate) => {
    return () => {
      setConfirm(candidate);
    };
  };

  const handleCancel = () => {
    setConfirm(undefined)
  }

  const handleVote = () => {
    dispatch(vote(voting.id, confirm.id, () => navigate(`/voting/${voting.id}`)))
  }

  if(loading) {
    return <p>Carregando votação...</p>
  }

  if(error) {
    return <p>Erro ao carregar a votação: {message}</p>
  }

  if(!voting) {
    return null
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
          <button onClick={handleVote}>Confirmar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>
        </>
      ) : (
        <>
          <h3>Selecione o candidato que quer votar.</h3>
          <div className="do-vote__candidates">
            {voting.candidates.map(candidate => (
              <CandidateCard key={candidate.id} onClick={handleClick(candidate)} candidate={candidate} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DoVote;
