import React, { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { Route, Routes } from "react-router-dom";
import AdministrativeArea from '../AdministrativeArea';
import MainPage from '../MainPage';
import ProtocolsView from '../ProtocolsView';
import ProtocolCreate from '../ProtocolCreate';
import ProtocolTypeCreate from '../ProtocolTypeCreate';
import ProtocolTypeEdit from '../ProtocolTypeEdit';
import ProtocolTypesView from '../ProtocolTypesView';
import SignIn from '../Signin';
import SignUp from '../Signup';
import ProtocolEdit from '../ProtocolEdit';

export const LoggedContext = createContext({ logged: false, setLogged: undefined })

const Router = () => {

  const [logged, setLogged] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  console.log(location)

  useEffect(() => {
    if(!logged && !['/administrative', '/administrative/login', '/administrative/signup', '/'].includes(location.pathname)) {
      navigate('/administrative')
    }
  }, [location.pathname, logged, navigate])

  return (
    <LoggedContext.Provider value={{ logged, setLogged }}>
    <div className="applicationContainer">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/administrative" element={<AdministrativeArea/>}/>
          <Route path="/administrative/login" element={<SignIn/>}/>
          <Route path="/administrative/signup" element={<SignUp/>}/>
          <Route path="/administrative/protocol-types" element={<ProtocolTypesView/>}/>
          <Route path="/administrative/protocol-types/create" element={<ProtocolTypeCreate/>}/>
          <Route path="/administrative/protocol-types/:id/edit" element={<ProtocolTypeEdit/>}/>
          <Route path="/administrative/protocols" element={<ProtocolsView/>}/>
          <Route path="/administrative/protocols/create" element={<ProtocolCreate/>}/>
          <Route path="/administrative/protocols/:id/edit" element={<ProtocolEdit/>}/>
        </Routes>
    </div></LoggedContext.Provider>
  )
}

export default Router