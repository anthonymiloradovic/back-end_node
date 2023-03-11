import React, { useState } from 'react';
import axios from 'axios';

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [seller, setSeller] = useState(false);
  const [sellerDescription, setSellerDescription] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users', {
        email,
        password,
        name,
        seller,
        seller_description: sellerDescription,
        seller_email: sellerEmail,
        seller_phone: sellerPhone,
      });
      setSubmitted(true);
      setSuccessMessage('Vous êtes inscrit !');
      setEmail('');
      setPassword('');
      setName('');
      setSeller(false);
      setSellerDescription('');
      setSellerEmail('');
      setSellerPhone('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {submitted && <div>{successMessage}</div>}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="seller">Seller:</label>
        <input
          type="checkbox"
          name="seller"
          id="seller"
          checked={seller}
          onChange={e => setSeller(e.target.checked)}
        />
      </div>
      {seller && (
        <>
          <div>
            <label htmlFor="sellerDescription">Seller description:</label>
            <input
              type="text"
              name="sellerDescription"
              id="sellerDescription"
              value={sellerDescription}
              onChange={e => setSellerDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="sellerEmail">Seller email:</label>
            <input
              type="email"
              name="sellerEmail"
              id="sellerEmail"
              value={sellerEmail}
              onChange={e => setSellerEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="sellerPhone">Seller phone:</label>
            <input
              type="tel"
              name="sellerPhone"
              id="sellerPhone"
              value={sellerPhone}
              onChange={e => setSellerPhone(e.target.value)}

            />
          </div>
        </>
      )}
      <button type="submit">Sign up</button>
    </form>
  );
}

export default RegistrationForm;
