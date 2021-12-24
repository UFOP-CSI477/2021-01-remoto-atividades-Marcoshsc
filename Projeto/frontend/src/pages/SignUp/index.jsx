import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { signupUser } from '../../redux/auth/actions'
import { getAuthError, isLoadingUser } from '../../redux/auth/selectors'
import { handleChange } from '../../utils/input'
import './styles.scss'

const SignUp = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loading = useSelector(isLoadingUser)
  const error = useSelector(getAuthError)

  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleGoToSignIn = useCallback(() => {
    navigate('/signin')
  }, [navigate])

  const handleSignUp = useCallback((e) => {
    e.preventDefault()
    dispatch(signupUser(email, user, password))
  }, [dispatch, user, email, password])

  return <div className="signup__container">
    <h2 className="signup-title">
      Cadastrar em Vote.It
    </h2>
    <form onSubmit={handleSignUp} className="signup__form">
      <div className="signup__input-group">
        <label htmlFor="username">Usuário</label>
        <input name="username" value={user} onChange={handleChange(setUser)} type="text"/>
      </div>
      <div className="signup__input-group">
        <label htmlFor="email">Email</label>
        <input name="email" value={email} onChange={handleChange(setEmail)} type="text"/>
      </div>
      <div className="signup__input-group">
        <label htmlFor="password">Senha</label>
        <input name="password" value={password} onChange={handleChange(setPassword)} type="password"/>
      </div>
      <div className="signup__actions">
        <button type="submit" className="signup__actions__submit">Cadastrar</button>
        <button className="signup__actions__submit" onClick={handleGoToSignIn}>Já tenho conta, fazer login</button>
      </div>
    </form>
    {loading && <p>Fazendo login...</p>}
    {error.error && <p>Erro ao fazer login: {error.message}</p>}
  </div> 
}

export default SignUp