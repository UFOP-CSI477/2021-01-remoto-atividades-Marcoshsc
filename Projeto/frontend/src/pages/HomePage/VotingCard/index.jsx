import React from 'react'
import { FiLink, FiTrash } from 'react-icons/fi'
import { AiOutlineEye } from 'react-icons/ai'
import './styles.scss'
import { getFormattedDate } from '../../../utils/date'
import { useDispatch } from 'react-redux'
import { deleteVoting } from '../../../redux/votings/actions'
import { useNavigate } from 'react-router'

const VotingCard = ({ voting }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDeleteVoting = () => {
    dispatch(deleteVoting(voting.id))
  }

  const handleCopyToClipBoard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/voting/${voting.id}`).then(() => {
      alert('Link copiado!')
    })
  }

  const handleGoToVoting = () => {
    navigate(`/voting/${voting.id}`)
  }

  return (
    <div className="voting-card__container">
      <div className="voting-card__content">
        <p className="voting-card__content__title">{voting.title}</p>
        <div className="voting-card__content__secondary-info">
          <p>Aberta: {voting.open ? 'Sim' : 'Não'}</p>
          <p>Número de votantes: {voting.numberOfVoters}</p>
          <p>Data inicial: {getFormattedDate(new Date(voting.start))}</p>
          <p>Data final: {getFormattedDate(new Date(voting.end))}</p>
        </div>
      </div>
      <div className="voting-card__actions">
        <div className="voting-card__actions__icon" onClick={handleCopyToClipBoard}>
          <FiLink/>
        </div>
        <div className="voting-card__actions__icon" onClick={handleGoToVoting}>
          <AiOutlineEye/>
        </div>
        <div className="voting-card__actions__icon" onClick={handleDeleteVoting}>
          <FiTrash/>
        </div>
      </div>
    </div>
  )
}

export default VotingCard