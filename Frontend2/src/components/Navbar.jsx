import React ,{useState,useContext} from 'react';
import { Link } from 'react-router-dom';
import {userContext} from "../App"
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Navbar = () => {
  
  const user=useContext(userContext);
  console.log("User context in Navbar:", user);
  const navigate=useNavigate();

 const handleLogout=()=>{
    axios.get("http://localhost:4005/logout")
    .then(res=> {
      if(res.data=== "success")
      alert("user logout");
      navigate("/");//same page refresh
    }).catch(err=> console.log(err))
  }
  return (
    <>
      <div className="px-[20px] w-full">
        <div className="w-full font-serif hover:text-2xl shadow-xl h-[60px] flex bg-white justify-around">
          <div className="mt-5 ml-6 items-center text-2xl text-blue-950">
           <h1>Blog App</h1>
          </div>
          <div className="flex gap-6 items-center">
          <Link to="/">Home</Link>
          {
            user.email
             ?
            <Link to="/create">Create</Link>
            :
            <></>
          }
          
          <Link to="/contact">Contact</Link>
          
          </div>
          <div className="mr-[50px] flex justify-between gap-4 mt-5">
            {
              user.email 
              ?(
              <div>
              <input onClick={handleLogout} type="button" value="Logout" className="p-1 rounded-md hover:bg-blue-200 text-white bg-blue-400"/>
            </div>
              ):
              (
            <div>
              <Link to="/signup">Signup</Link>
            </div>
              )
            }
          
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
