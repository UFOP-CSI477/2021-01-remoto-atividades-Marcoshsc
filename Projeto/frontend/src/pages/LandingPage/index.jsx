import React from 'react'
import { useNavigate } from 'react-router'
import './styles.scss'

const LandingPage = () => {

  const navigate = useNavigate()

  const handleSignup = () => {
    navigate('/signup')
  }

  return (
    <div className="landing-page__container">
      <img src="votingImage.png" alt="Vote.it logo"/>
      <div className="landing-page__title">
        <h1 className="landing-page__title__main">Vote.it</h1>
        <h2 className="landing-page__title__secondary">Crie incríveis votações num estalar de dedos</h2>
      </div>
      <div className="landing-page__actions">
        <button className="landing-page__actions__button" onClick={handleSignup}>Cadastrar</button> 
        <button className="landing-page__actions__button">Fazer login</button> 
      </div> 
    </div>
  )
}

export default LandingPage