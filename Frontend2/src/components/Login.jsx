import React ,{useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login = () => {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
let navigate=useNavigate();

axios.defaults.withCredentials=true;
const handleSubmit=(e)=>{
e.preventDefault();
axios.post("http://localhost:4005/login",{email,password})
.then(result => {console.log(result)
  
  navigate("/create")
})
.catch(err=> console.log(err))
}

  return (
    <div className="flex justify-center items-center mt-12  ">
        <div className=" p-12 w-[500px] bg-white" >
            <h1 className=" rounded-md flex justify-center text-xl text-white mb-6 bg-blue-500 px-4 py-1 ">Login Here </h1>
       <form onSubmit={handleSubmit}>
        
            <input type="email" placeholder="enter your email" 
            className="p-2 mb-12 w-full  rounded-md border-gray-500"
            value={email} onChange={(e)=>setEmail(e.target.value)}/>

            <input type="password"  placeholder="enter Password"
            className="p-2 mb-12 w-full  rounded-md border-gray-500"
            value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <div className="flex gap-4">
            <h2 className="to-blue-300">Register?</h2>
            <button type="submit" className="bg-blue-500 text-white rounded-sm p-1 ">Login</button>
            </div>
              
     </form>
    </div>
        
</div>
  )
}

export default Login