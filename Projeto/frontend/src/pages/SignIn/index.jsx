import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { loginUser } from '../../redux/auth/actions'
import { getAuthError, isLoadingUser } from '../../redux/auth/selectors'
import { handleChange } from '../../utils/input'
import './styles.scss'

const SignIn = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loading = useSelector(isLoadingUser)
  const error = useSelector(getAuthError)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleGoToSignUp = useCallback(() => {
    navigate('/signup')
  }, [navigate])

  const handleSignIn = useCallback((e) => {
    e.preventDefault()
    dispatch(loginUser(email, password))
  }, [dispatch, email, password])

  return <div className="signin__container">
    <h2 className="signin-title">
      Fazer login em Vote.It
    </h2>
    <form onSubmit={handleSignIn} className="signin__form">
      <div className="signin__input-group">
        <label htmlFor="email">Email</label>
        <input name="email" value={email} onChange={handleChange(setEmail)} type="text"/>
      </div>
      <div className="signin__input-group">
        <label htmlFor="password">Senha</label>
        <input name="password" value={password} onChange={handleChange(setPassword)} type="password"/>
      </div>
      <div className="signin__actions">
        <button type="submit" className="signin__actions__submit">Fazer login</button>
        <button className="signin__actions__submit" onClick={handleGoToSignUp}>Não tenho conta, cadastrar</button>
      </div>
    </form>
    {loading && <p>Fazendo login...</p>}
    {error.error && <p>Erro ao fazer login: {error.message}</p>}
  </div> 
}

export default SignIn