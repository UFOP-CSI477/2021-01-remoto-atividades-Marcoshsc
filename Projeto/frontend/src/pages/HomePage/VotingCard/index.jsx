import React from 'react'
import { FiLink } from 'react-icons/fi'
import { AiOutlineEye } from 'react-icons/ai'
import './styles.scss'

const VotingCard = ({ voting }) => {
  return (
    <div className="voting-card__container">
      <div className="voting-card__content">
        <p className="voting-card__content__title">{voting.title}</p>
        <div className="voting-card__content__secondary-info">
          <p>Aberta: {voting.open ? 'Sim' : 'Não'}</p>
          <p>Número de votantes: {voting.numberOfVoters}</p>
          <p>Data inicial: {voting.startDate}</p>
          <p>Data final: {voting.endDate}</p>
        </div>
      </div>
      <div className="voting-card__actions">
        <div className="voting-card__actions__icon">
          <FiLink/>
        </div>
        <div className="voting-card__actions__icon">
          <AiOutlineEye/>
        </div>
      </div>
    </div>
  )
}

export default VotingCard