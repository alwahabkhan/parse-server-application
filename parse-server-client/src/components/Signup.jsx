import React, { useState } from 'react';
import Parse from '../parseConfig.js';

const Signup = () => {

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = new Parse.User();
      user.set('username', data.username);
      user.set('password', data.password);
      user.set('email', data.email);

      await user.signUp();
      alert('Signup successful!');
    } catch (error) {
      setError(error.message);
    }
  };

 
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

 
  console.log(data); 

  return (
    <div>
      <h2>Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username" 
          placeholder="Username"
          value={data.username} 
          onChange={onChangeHandler}  
          required
        />
        <br /><br />
        <input
          type="email"
          name="email"  
          placeholder="Email"
          value={data.email}  
          onChange={onChangeHandler} 
          required
        />
        <br /><br />
        <input
          type="password"
          name="password"  
          placeholder="Password"
          value={data.password}  
          onChange={onChangeHandler}  
          required
        />
        <br /><br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
