import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  axios.defaults.withCredentials = true;
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://backendb-ltn4.onrender.com/users/signup', { name, email, password })
      .then(result => {
        console.log('Signup successful:', result);
      navigate('/login');
      })
      .catch(err => {
        console.error('Error during signup:', err);
        setError('Signup failed: ' + err.response?.data?.message || 'Server error');
      });
  };

  return (
    <div className="flex justify-center items-center mt-12">
      <div className="p-12 w-[700px] bg-white border-black">
        <h1 className="text-xl flex justify-center items-center text-white mb-6 rounded-md bg-blue-500 px-4 py-1">
          Signup Here
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            className="p-2 mb-8 w-full rounded-md border-gray-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 mb-8 w-full rounded-md border-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="p-2 mb-8 w-full rounded-md border-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center gap-4">
            <h2 className="to-blue-300">Already Registered?</h2>
            <button type="submit" className="bg-blue-500 text-white rounded-sm p-1">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
