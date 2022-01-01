import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { handleChange } from '../../../utils/input'
import './styles.scss'

const FollowVoting = () => {

  const [text, setText] = useState('')
  const navigate = useNavigate()

  const handleFollow = () => {
    if(text.includes('http://localhost:3000/voting/')) {
      if(!isNaN(Number.parseInt(text.replace('http://localhost:3000/voting/', '')))) {
        window.location.href = text
      }
      else {
        alert("Link Inválido.")
      }
    }
    else {
      if(!isNaN(Number.parseInt(text))) {
        navigate(`/voting/${text}`)
      }
      else {
        alert("ID inválido.")
      }
    }
  }

  return (
    <div className="follow-voting__container">
      <form onSubmit={e => e.preventDefault()} className="follow-voting__form">
        <label htmlFor="voting-input">Participar de uma votação</label>  
        <input name="voting-input" value={text} onChange={handleChange(setText)} type="text" placeholder="Insira o link ou ID da votação"/>
        <button onClick={handleFollow}>Buscar votação</button>
      </form>     
    </div>
  )
}

export default FollowVoting