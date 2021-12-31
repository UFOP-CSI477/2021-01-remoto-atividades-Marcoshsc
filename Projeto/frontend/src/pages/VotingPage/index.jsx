import React from 'react'
import { useParams } from 'react-router'
import CandidateCard from './CandidateCard'
import './styles.scss'

const VotingPage = () => {

  const { id } = useParams()

  return ( <div className="voting-page__container">
    <div className="voting-page__header">
      <h2>Titulo da votacao</h2>
      <button>Votar</button>
    </div>
    <div className="voting-page__content-item">
      <p>Descricao da votacao</p>
    </div>
    <div className="voting-page__content-item">
      <p>Data de inicio: 11/12/2021</p>
      <p>Data de fim: 24/12/2021</p>
    </div>
    <div className="voting-page__content-item">
      <p>Informacoes da votacao (por email ou anonima)</p>
    </div>
    <div className="voting-page__candidates">
      <CandidateCard candidate={{name: 'Julia Trule', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80'}}/>
      <CandidateCard candidate={{name: 'Julia Trule', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80'}}/>
      <CandidateCard candidate={{name: 'Julia Trule', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80'}}/>
      <CandidateCard candidate={{name: 'Julia Trule', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80'}}/>
      <CandidateCard candidate={{name: 'Julia Trule', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80'}}/>
    </div>
  </div> )

}

export default VotingPage