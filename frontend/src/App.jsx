import { Suspense } from 'react';
import './App.css'
import React from 'react';
import {BrowserRouter,Route,Routes} from "react-router-dom";

const Signup =React.lazy(()=>import('./pages/Signup'));
const Signin =React.lazy(()=>import('./pages/signin'));
const Dashboard =React.lazy(()=>import('./pages/Dashboard'));
const SendMoney =React.lazy(()=>import('./pages/SendMoney'));
const HomeRedirect=React.lazy(()=>import('./pages/HomeRedirect'));
const Landing=React.lazy(()=>import('./pages/Landing'));
const NewLanding=React.lazy(()=>import('./pages/newLanding'));
const Profile=React.lazy(()=>import('./pages/ProfilePage'));
const Modify=React.lazy(()=>import('./pages/ModifyUser'))

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          //Landing
          <Route path="/" element={<Suspense fallback="loading..."><NewLanding/></Suspense>}/>
          <Route path="/new-landing" element={<Suspense fallback="loading..."><NewLanding/></Suspense>}/>

          //Redirection
          <Route path="/my" element={<Suspense fallback="loading..."><HomeRedirect/></Suspense>}/>

          <Route path="/signup" element={<Suspense fallback="loading..."><Signup/></Suspense>} />
          <Route path="/signin" element={<Suspense fallback="loading..."><Signin/></Suspense>} />
          <Route path="/dashboard" element={<Suspense fallback="loading..."><Dashboard/></Suspense>}/>
          <Route path="/send" element={<Suspense fallback="loading..."><SendMoney/></Suspense>}/>
          <Route path="/profile" element={<Suspense fallback="loading..."><Profile></Profile></Suspense>}/>
          <Route path="/modify" element={<Suspense fallback="loading..."><Modify/></Suspense>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
