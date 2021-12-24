import React from 'react'
import './styles.scss'

const AppContainer = ({ children }) => {
  return <div className="app-container">
    {children}
  </div>
}

export default AppContainer