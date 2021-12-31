import React, { Fragment, useState } from 'react'
import './styles.scss'

const NewVoting = () => {

  const [candidates, setCandidates] = useState([])

  const handleAddNewCandidate = () => {
    setCandidates([...candidates, { avatar: '', name: '' }])
  }

  const handleChangeCandidateName = (idx) => {
    return (e) => {
      const newCandidates = candidates.map((el, idx2) => {
        if(idx2 === idx) {
          return {
            ...el,
            name: e.target.value
          }
        }
        return el
      })
      setCandidates(newCandidates)
    } 
  }

  const handleChangeCandidateAvatar = (idx) => {
    return (e) => {
      const newCandidates = candidates.map((el, idx2) => {
        if(idx2 === idx) {
          return {
            ...el,
            avatar: e.target.value
          }
        }
        return el
      })
      setCandidates(newCandidates)
    } 
  }

  const handleRemoveCandidate = (idx) => {
    return () => {
      setCandidates(candidates.filter((el, idx2) => idx !== idx2))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(candidates)
  }

  return (
    <div className="new-voting__container">
      <h2 className="new-voting__title">Nova votação</h2>
      <form onSubmit={handleSubmit} className="new-voting__form">
        <div className="new-voting__input-group">
          <label htmlFor="title">Título</label>
          <input type="text" name="title" />
        </div>
        <div className="new-voting__input-group">
          <label htmlFor="description">Descrição</label>
          <input type="text" name="description" />
        </div>
        <div className="new-voting__input-group">
          <label htmlFor="start">Início</label>
          <input type="date" name="start" />
        </div>
        <div className="new-voting__input-group">
          <label htmlFor="end">Fim</label>
          <input type="date" name="end" />
        </div>
        <div className="new-voting__candidates">
          <div className="new-voting__candidates__header">
            <h3 className="new-voting__candidates__title">Candidatos</h3>
            <button type="button" className="new-voting__button" onClick={handleAddNewCandidate}>Adicionar novo candidato</button>
          </div>
          {candidates.map((candidate, idx) => (
            <Fragment key={idx}>
              <div className="new-voting__candidates__header">
                <h3>Candidato {idx}</h3>
                <button className="new-voting__button" onClick={handleRemoveCandidate(idx)} type="button">Remover candidato</button>
              </div>
              <div className="new-voting__input-group">
                <label htmlFor={`candidate-${idx}-avatar`}>Foto</label>
                <input type="text" value={candidate.name} onChange={handleChangeCandidateName(idx)}  name={`candidate-${idx}-avatar`} />
              </div>
              <div className="new-voting__input-group">
                <label htmlFor={`candidate-${idx}-name`}>Nome</label>
                <input type="text" value={candidate.avatar} onChange={handleChangeCandidateAvatar(idx)} name={`candidate-${idx}-name`} />
              </div>
            </Fragment>
          ))}
        </div>
        <button className="new-voting__button" type="submit">Criar votação</button>
      </form>
    </div>
  )
}

export default NewVoting