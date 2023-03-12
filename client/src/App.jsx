import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegistrationForm from './components/RegistrationForm';
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import './styles/index.scss';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={() => setIsLoggedIn(false)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logout" element={<Logout handleLogout={() => setIsLoggedIn(false)} />} />
        <Route path="/signup" element={<RegistrationForm />} />
        <Route path="/login" element={<Login handleLogin={setIsLoggedIn} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
