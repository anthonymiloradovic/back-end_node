import React, { useState, useEffect } from 'react';
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
  const [emailAvailable, setEmailAvailable] = useState(true);

  const checkEmailAvailability = async (email) => {
    try {
      if (email) {
        const response = await axios.get(`http://localhost:5000/users/email/${email}`);
        setEmailAvailable(response.data.available);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (email) {
      checkEmailAvailability(email);
    }
  }, [email]);
  

  
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
      window.location.href = '/'; 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="form-section">
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            {submitted && <div>{successMessage}</div>}
            <div className="inputbox">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => checkEmailAvailability(email)}
                required
              />
              <label htmlFor="email">Email</label>
              {!emailAvailable && (
                <p className="error-message">L'adresse e-mail est déjà utilisée.</p>
              )}
            </div>
            <div className="inputbox">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="inputbox">
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="seller"
                id="seller"
                checked={seller}
                onChange={(e) => setSeller(e.target.checked)}
              />
              <label htmlFor="seller">Seller</label>
            </div>
            {seller && (
              <>
                <div className="inputbox">
                  <input
                    type="text"
                    name="sellerDescription"
                    id="sellerDescription"
                    value={sellerDescription}
                    onChange={(e) => setSellerDescription(e.target.value)}
                  />
                  <label htmlFor="sellerDescription">Seller description</label>
                </div>
                <div className="inputbox">
                  <input
                    type="email"
                    name="sellerEmail"
                    id="sellerEmail"
                    value={sellerEmail}
                    onChange={(e) => setSellerEmail(e.target.value)}
                  />
                  <label htmlFor="sellerEmail">Seller email</label>
                </div>
                <div className="inputbox">
                  <input
                    type="tel"
                    name="sellerPhone"
                    id="sellerPhone"
                    value={sellerPhone}
                    onChange={(e) => setSellerPhone(e.target.value)}
                  />
                  <label htmlFor="sellerPhone">Seller phone</label>
                </div>
              </>
            )}
            <button type="submit">Sign up</button>
          </form>
        </div>
      </div>
    </section>
  );
  
}

export default RegistrationForm;
