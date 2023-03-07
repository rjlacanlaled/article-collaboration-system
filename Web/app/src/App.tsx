import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import SignupSuccessPage from './Pages/SignupSuccessPage';
import ResetPasswordPage from './Pages/ResetPasswordPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/success" element={<SignupSuccessPage/>} />
        <Route path="/reset-password" element={<ResetPasswordPage/>} />
      </Routes>
    </div>
  );
}

export default App;
