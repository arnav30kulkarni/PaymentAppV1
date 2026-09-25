import { Suspense } from 'react';
import './App.css'
import React from 'react';
import { useEffect } from 'react';
import {BrowserRouter,Route,Routes} from "react-router-dom";

const Dashboard =React.lazy(()=>import('./pages/Dashboard'));
const SendMoney =React.lazy(()=>import('./pages/SendMoney'));
const NewLanding=React.lazy(()=>import('./pages/NewLanding'));
const NewDashboard=React.lazy(()=>import('./pages/NewDashboard'));
const Profile=React.lazy(()=>import('./pages/ProfilePage'));

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.dataset.theme = savedTheme;
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          //Landing
          <Route path="/" element={<Suspense fallback="loading..."><NewLanding/></Suspense>}/>
          <Route path="/new-landing" element={<Suspense fallback="loading..."><NewLanding/></Suspense>}/>

          <Route path="/newdashboard" element={<Suspense fallback="loading..."><NewDashboard/></Suspense>}/>
          <Route path="/users" element={<Suspense fallback="loading..."><Dashboard/></Suspense>}/>
          <Route path="/send" element={<Suspense fallback="loading..."><SendMoney/></Suspense>}/>
          <Route path="/profile" element={<Suspense fallback="loading..."><Profile></Profile></Suspense>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
