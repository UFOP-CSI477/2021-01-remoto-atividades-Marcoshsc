import React from 'react'
import "./styles.scss"

const AppHeader = () => {
  return <div className="app-header__container">
    <h2 className="app-header__user">Nome do usuario</h2>
    <button className="app-header__exit">Sair</button>
  </div>
}

export default AppHeader