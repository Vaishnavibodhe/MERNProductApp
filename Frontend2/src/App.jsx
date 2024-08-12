import React, { useEffect ,useState} from 'react'
import axios from "axios"
import Navbar from "./components/Navbar"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import Home from "./components/Home"
import Create from "./components/Create"
import Alldata from "./components/Alldata"
import Product from "./components/Product"

import { BrowserRouter ,Routes ,Route} from 'react-router-dom'
import {createContext} from "react"

export const userContext=createContext()
const App = () => {

const [user, setUser] = useState({});

  axios.defaults.withCredentials=true;
  useEffect(()=>{
axios.get('https://backend3-umpv.onrender.com/')
.then(user => { console.log("User Data:", user.data)
  setUser(user.data)})
.catch(err=> console.log(err))
  },[])
  return (
  
      <div>
        <userContext.Provider value={user}>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path="/signup" element={<SignUp/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/create" element={<Create/>}/>
        <Route exact path="/alldata" element={<Alldata/>}/>
        <Route exact path="/product/:id" element={<Product/>}/>


      </Routes>
      
      
      </BrowserRouter>
    </userContext.Provider>
      </div>
    
  )
}

export default App