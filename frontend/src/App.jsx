import { Suspense } from 'react';
import './App.css'
import React from 'react';
import {BrowserRouter,Route,Routes} from "react-router-dom";

const Signup =React.lazy(()=>import('./pages/Signup'));
const Signin =React.lazy(()=>import('./pages/signin'));
const Dashboard =React.lazy(()=>import('./pages/Dashboard'));
const SendMoney =React.lazy(()=>import('./pages/SendMoney'));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Suspense fallback="loading..."><Signup/></Suspense>} />
          <Route path="/signin" element={<Suspense fallback="loading..."><Signin/></Suspense>} />
          <Route path="/dashboard" element={<Suspense fallback="loading..."><Dashboard/></Suspense>}/>
          <Route path="/send" element={<Suspense fallback="loading..."><SendMoney/></Suspense>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
