import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { logoutUser } from '../../redux/auth/actions'
import { getCurrentUser } from '../../redux/auth/selectors'
import "./styles.scss"

const AppHeader = () => {

  const dispatch = useDispatch()
  const user = useSelector(getCurrentUser)
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const handleLandingPage = () => {
    navigate('/home')
  }

  if(!user) return null

  return <div className="app-header__container">
    <h2 className="app-header__user" onClick={handleLandingPage}>{user.username}</h2>
    <button className="app-header__exit" onClick={handleLogout}>Sair</button>
  </div>
}

export default AppHeader