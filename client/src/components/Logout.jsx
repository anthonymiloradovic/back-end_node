import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

function Logout({ handleLogout, userId }) {
  const handleClick = async () => {
    localStorage.removeItem('token');
    await handleLogout();
    try {
        await axios.post('http://localhost:5000/users/logout', { userId });
        alert('Vous êtes déconnecté');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Vous êtes sur le point de vous déconnecter.</h2>
      <button onClick={handleClick}>Se déconnecter</button>
      <Link to="/">Annuler</Link>
    </div>
  );
}

export default Logout;
