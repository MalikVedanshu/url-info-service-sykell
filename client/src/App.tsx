import './App.css';
import './themes/common.css';
import {Routes, Route} from "react-router-dom";
import React from 'react';
import UserAuth from './pages/auth/index.tsx';
import Dashboard from './pages/dashboard/index.tsx';

const App: React.FC = () => {


  return (
    <Routes>
      <Route path='/' element={<UserAuth />} />
      <Route path='/dashboard' element={<Dashboard />} />
      

    </Routes>
  )
}

export default App;
