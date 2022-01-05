import React, { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { Route, Routes } from "react-router-dom";
import AdministrativeArea from '../AdministrativeArea';
import MainPage from '../MainPage';
import RecordView from '../RecordView';
import RecordCreate from '../RecordCreate';
import RecordEdit from '../RecordEdit';
import PeopleEdit from '../PeopleEdit';
import PeopleView from '../PeopleView';
import PeopleCreate from '../PeopleCreate';
import SignIn from '../Signin';
import SignUp from '../Signup';
import ProtocolAndTypeReport from '../ProtocolAndTypeReport';
import ProtocolTypeReport from '../ProtocolTypeReport';
import UsersReport from '../UsersReport';
import UnitView from '../UnitView';
import UnitEdit from '../UnitEdit';
import UnitCreate from '../UnitCreate';
import VaccineView from '../VaccineView';
import VaccineEdit from '../VaccineEdit';
import VaccineCreate from '../VaccineCreate';

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
          <Route path="/general" element={<ProtocolTypeReport/>}/>
          <Route path="/administrative/login" element={<SignIn/>}/>
          <Route path="/administrative/signup" element={<SignUp/>}/>
          <Route path="/administrative/people" element={<PeopleView/>}/>
          <Route path="/administrative/people/create" element={<PeopleCreate/>}/>
          <Route path="/administrative/people/:id/edit" element={<PeopleEdit/>}/>
          <Route path="/administrative/units" element={<UnitView/>}/>
          <Route path="/administrative/units/create" element={<UnitCreate/>}/>
          <Route path="/administrative/units/:id/edit" element={<UnitEdit/>}/>
          <Route path="/administrative/vaccines" element={<VaccineView/>}/>
          <Route path="/administrative/vaccines/create" element={<VaccineCreate/>}/>
          <Route path="/administrative/vaccines/:id/edit" element={<VaccineEdit/>}/>
          <Route path="/administrative/records" element={<RecordView/>}/>
          <Route path="/administrative/records/create" element={<RecordCreate/>}/>
          <Route path="/administrative/records/:id/edit" element={<RecordEdit/>}/>
          <Route path="/administrative/protocol-and-type-report" element={<ProtocolAndTypeReport/>}/>
          <Route path="/administrative/users-report" element={<UsersReport/>}/>
        </Routes>
    </div></LoggedContext.Provider>
  )
}

export default Router