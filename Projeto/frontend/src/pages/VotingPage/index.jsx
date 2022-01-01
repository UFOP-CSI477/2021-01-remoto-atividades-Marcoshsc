import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { getCurrentUser } from '../../redux/auth/selectors'
import { selectVoting } from '../../redux/votings/actions'
import { getSelectedVoting, getSelectedVotingError, getSelectedVotingLoading } from '../../redux/votings/selectors'
import { getFormattedDate } from '../../utils/date'
import CandidateCard from './CandidateCard'
import './styles.scss'

const VotingPage = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const voting = useSelector(getSelectedVoting)
  const currentUser = useSelector(getCurrentUser)
  const loading = useSelector(getSelectedVotingLoading)
  const { error, message } = useSelector(getSelectedVotingError)

  useEffect(() => {
    if(currentUser) {
      dispatch(selectVoting(id))
    }
  }, [id, dispatch, currentUser])

  const handleDoVote = () => {
    navigate(`/voting/${voting.id}/vote`)
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

  return ( <div className="voting-page__container">
    <div className="voting-page__header">
      <h2>{voting.title}</h2>
      {voting.canVote ? <button onClick={handleDoVote}>Votar</button> : <p>Você já registrou seu voto nessa votação.</p>}
    </div>
    <div className="voting-page__content-item">
      <p>{voting.description}</p>
    </div>
    <div className="voting-page__content-item">
      <p>Data de inicio: {getFormattedDate(new Date(voting.start))}</p>
      <p>Data de fim: {getFormattedDate(new Date(voting.end))}</p>
    </div>
    {/* <div className="voting-page__content-item">
      <p>Informacoes da votacao (por email ou anonima)</p>
    </div> */}
    <div className="voting-page__candidates">
      {voting.candidates.map(candidate => (
        <CandidateCard key={candidate.id} candidate={candidate}/>
      ))}
    </div>
  </div> )
}

export default VotingPage