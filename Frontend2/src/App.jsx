import React, { useEffect ,useState} from 'react'
import axios from "axios"
import Navbar from "./components/Navbar"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import Home from "./components/Home"
import Create from "./components/Create"
import DesignPage from "./components/DesignPage"
import Product from "./components/Product"

import { BrowserRouter ,Routes ,Route} from 'react-router-dom'
import {createContext} from "react"

export const userContext=createContext()
const App = () => {

const [user, setUser] = useState({});

  axios.defaults.withCredentials=true;

  useEffect(()=>{
    const token = localStorage.getItem('token'); 
axios.get('http://localhost:4005/',{
  headers: {
    'Authorization': `Bearer ${token}`, // Add the token to headers
    'Content-Type': 'application/json'
}
})

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
        <Route exact path="/users/signup" element={<SignUp/>}/>
        <Route exact path="/users/login" element={<Login/>}/>
        <Route exact path="/admin/getproducts" element={<Home/>}/>
        <Route exact path="/admin/create" element={<Create/>}/>
        
        <Route exact path="/admin/product/:id" element={<Product/>}/>
        <Route exact path="/" element={<DesignPage/>}/>

      </Routes>
      
      
      </BrowserRouter>
    </userContext.Provider>
      </div>
    
  )
}

export default App