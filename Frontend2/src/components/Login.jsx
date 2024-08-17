import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("https://backendb-ltn4.onrender.com/users/login", { email, password })
      .then(response => {
        if(response.data=== "success"){
          const { token } = response.data;
        // Save to localStorage
        localStorage.setItem('token', token);
            alert("Login successful!");
           window.location.href="/create"
        }
      })
      .catch(err => {
        console.error('Error during login:', err);
        alert('Login failed. Please check your credentials.');
      });
  };

  return (
    <div className="flex justify-center items-center mt-12">
      <div className="p-12 w-[500px] bg-white">
        <h1 className="rounded-md flex justify-center text-xl text-white mb-6 bg-blue-500 px-4 py-1">Login Here</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 mb-12 w-full rounded-md border-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="p-2 mb-12 w-full rounded-md border-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white rounded-sm p-1">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
