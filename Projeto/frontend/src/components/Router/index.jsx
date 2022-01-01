import React from 'react'
import { Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "../../pages/LandingPage";
import AppHeader from "../../components/AppHeader";
import AppContainer from "../../components/AppContainer";
import SignUp from "../../pages/SignUp";
import SignIn from "../../pages/SignIn";
import HomePage from "../../pages/HomePage";
import VotingPage from "../../pages/VotingPage";
import DoVote from "../../pages/DoVote";
import NewVoting from "../../pages/NewVoting";
import { useSelector } from "react-redux";
import { getCheckedLogged, getCurrentUser } from "../../redux/auth/selectors";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { fetchUserInfo } from '../../redux/auth/actions';

const Router = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(getCurrentUser)
  const checkedLogged = useSelector(getCheckedLogged)
  const location = useLocation()

  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])

  useEffect(() => {
    if(!user && !['/signin', '/signup'].includes(location.pathname) && checkedLogged) {
      navigate('/signin')
    }
    if(user && ['/signin', '/signup'].includes(location.pathname)) {
      navigate('/home')
    }
  }, [user, navigate, location, checkedLogged])

  return (
        <div className="applicationContainer">
          <AppHeader />
          <AppContainer>
            <Routes>
              <Route path="/voting/new" element={<NewVoting/>}/>
              <Route path="/voting/:id/vote" element={<DoVote/>}/>
              <Route path="/voting/:id" element={<VotingPage/>}/>
              <Route path="/home" element={<HomePage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/" element={<LandingPage />} />
            </Routes>
          </AppContainer>
        </div>
  )
}

export default Router