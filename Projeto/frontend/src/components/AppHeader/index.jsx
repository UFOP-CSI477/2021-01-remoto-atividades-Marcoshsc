import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { logoutUser } from '../../redux/auth/actions'
import { getCurrentUser } from '../../redux/auth/selectors'
import "./styles.scss"

const AppHeader = () => {

  const dispatch = useDispatch()
  const user = useSelector(getCurrentUser)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  if(!user) return null

  return <div className="app-header__container">
    <h2 className="app-header__user">{user.username}</h2>
    <button className="app-header__exit" onClick={handleLogout}>Sair</button>
  </div>
}

export default AppHeader