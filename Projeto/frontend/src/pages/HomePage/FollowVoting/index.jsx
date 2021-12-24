import React from 'react'
import './styles.scss'

const FollowVoting = () => {

  return (
    <div className="follow-voting__container">
      <form className="follow-voting__form">
        <label htmlFor="voting-input">Participar de uma votação</label>  
        <input name="voting-input" type="text" placeholder="Insira o link ou ID da votação"/>
        <button type="submit">Buscar votação</button>
      </form>     
    </div>
  )
}

export default FollowVoting