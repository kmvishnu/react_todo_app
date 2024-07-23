import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import SignIn from './Components/User/SignIn'; // Update the path as per your folder structure
import SignUp from './Components/User/SignUp';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;
