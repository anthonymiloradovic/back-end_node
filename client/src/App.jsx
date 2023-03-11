import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RegistrationForm from './components/RegistrationForm'


function App() {

  const [artworks, setArtworks] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const result = await axios.get('http://localhost:5000/artworks');
    setArtworks(result.data);
  };
  fetchData();
}, []);



    return (
      <div>
        <RegistrationForm />
        {artworks.map(artwork => (
          <div key={artwork._id}>
            <h2>{artwork.title}</h2>
            <p>{artwork.artist}</p>
            <p>{artwork.content}</p>
            <img src={artwork.image} alt="Artwork" />
            <p>{artwork.price}</p>
            <p>{artwork.category}</p>
          </div>
        ))}
      </div>
    );


}



export default App
