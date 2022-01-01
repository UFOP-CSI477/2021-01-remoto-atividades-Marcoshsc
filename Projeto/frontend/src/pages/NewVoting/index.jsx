import React, { Fragment, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { createVoting } from '../../redux/votings/actions'
import { handleChange } from '../../utils/input'
import './styles.scss'

const NewVoting = () => {

  const [candidates, setCandidates] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

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

  const handleSubmit = useCallback(() => {
    dispatch(createVoting({
      title,
      description,
      start,
      end,
      candidates
    }, () => navigate('/home')))
  }, [dispatch, title, description, start, end, candidates, navigate])

  return (
    <div className="new-voting__container">
      <h2 className="new-voting__title">Nova votação</h2>
      <form onSubmit={e => e.preventDefault()} className="new-voting__form">
        <div className="new-voting__input-group">
          <label htmlFor="title">Título</label>
          <input type="text" name="title" value={title} onChange={handleChange(setTitle)} />
        </div>
        <div className="new-voting__input-group">
          <label htmlFor="description">Descrição</label>
          <input type="text" name="description" value={description} onChange={handleChange(setDescription)} />
        </div>
        <div className="new-voting__input-group">
          <label htmlFor="start">Início</label>
          <input type="date" name="start" value={start} onChange={handleChange(setStart)} />
        </div>
        <div className="new-voting__input-group">
          <label htmlFor="end">Fim</label>
          <input type="date" name="end" value={end} onChange={handleChange(setEnd)} />
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
                <input type="text" value={candidate.avatar} onChange={handleChangeCandidateAvatar(idx)}  name={`candidate-${idx}-avatar`} />
              </div>
              <div className="new-voting__input-group">
                <label htmlFor={`candidate-${idx}-name`}>Nome</label>
                <input type="text" value={candidate.name} onChange={handleChangeCandidateName(idx)} name={`candidate-${idx}-name`} />
              </div>
            </Fragment>
          ))}
        </div>
        <button className="new-voting__button" onClick={handleSubmit} >Criar votação</button>
      </form>
    </div>
  )
}

export default NewVoting