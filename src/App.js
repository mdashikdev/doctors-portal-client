import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AppointmentPage from './components/AppointmentPage';
import Login from './components/UserManage/Login';
import Dashboard from './components/Dashboard';
import './App.css';
import { createContext, useEffect, useState } from 'react';
import axios from "axios";
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile/Profile';

export const MainApi = 'http://localhost:3001';
export const AllContext = createContext();


function App() {
  const [services, setservices] = useState();
  const [users, setusers] = useState();
  const [currentUser, setcurrentUser] = useState();
  const [mainloading, setmainloading] = useState();
  const [alert, setalert] = useState({status:'',message:''})


  useEffect(() => {
    axios.get(`${MainApi}/services`)
    .then(res => setservices(res.data));
  }, [])

  const contexts = {
    services,users, setusers,currentUser, setcurrentUser,alert, setalert,mainloading, setmainloading
  }

  if (alert.message) {
    setTimeout(() => {
      setalert({status:'',message:''})
    }, 4000);
  }

  return (
    <AllContext.Provider value={contexts}>
      <Header/>

      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/appointment' element={<PrivateRoute><AppointmentPage/></PrivateRoute>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>} />
      </Routes>

      <div className={alert.message ? 'w-[400px] fixed left-[10px] bottom-3 bg-white rounded-xl shadow-lg z-30 alertBar' :'w-[400px] fixed left-[-500px] bottom-3 bg-white rounded-xl shadow-lg z-30 alertBar'}>
        <div className={alert.status ==='error' ? ' w-full bottom-3 left-3 bg-white border-2 border-red-500  text-red-500 rounded-xl px-4 py-3' :'w-full bg-white border-2 border-green-500 text-green-500 rounded-xl px-4 py-3'}>
          {alert?.message} 
        </div>
      </div>

    </AllContext.Provider>
  );
}

export default App;
