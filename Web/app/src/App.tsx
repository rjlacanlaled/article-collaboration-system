import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import SignupPage from './Pages/SignupPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<SignupPage/>} />
      </Routes>
    </div>
  );
}

export default App;
