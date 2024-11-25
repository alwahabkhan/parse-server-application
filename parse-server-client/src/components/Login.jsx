import React, { useState } from 'react';
import Parse from '../parseConfig.js';

const Login = ({ setSessionToken }) => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = data;

    try {
      const user = await Parse.User.logIn(username, password);
      const sessionToken = user.getSessionToken();
      setSessionToken(sessionToken);
      alert('Login successful!');
    } catch (error) {
      setError(error.message);
    }
  };

  console.log(data); 

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={data.username}
          onChange={handleInputChange}
          required
        />
        <br /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleInputChange}
          required
        />
        <br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
