const express=require("express");
const app=express();
const router=express.Router();
const UserModel =require("../models/UserModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser")

app.use(cookieParser());

/*for sign up*/
router.post("/signup",(req,res)=>{
    const {name,email,password}=req.body;
bcrypt.hash(password ,10)
.then(hash=>{
    UserModel.create({name,email,password:hash})
    .then(user =>{
       res.json(user);
    })
    .catch(err => res.json(err));
})
.catch(err=> console.log(err.message));
   })
/*for login*/
router.post("/login",(req,res)=>{
    const {email,password}=req.body;
    UserModel.findOne({email:email})
    .then(user =>{
       if(user){
        bcrypt.compare(password,user.password,(err,response)=>{
            if(response){
                const token=jwt.sign({email:user.email},"secret",{expiresIn:"1d"})
                res.cookie("token",token,{ httpOnly: true, secure: false });
            return res.json("success")
            }else{ 
               return res.json("passwor is incorrect")
            } 
        })
        }else{
        res.json("user not exist")
       }
    })
    .catch(err => res.json(err));
})
/*middleware*/

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(403).json({ message: "Token is not available" });
    }
  
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token is invalid" });
      }
      req.email = decoded.email;
      req.name = decoded.name;
      next();
    });
  };
  
  // Route to get user data
  router.get('/', verifyUser, (req, res) => {
    
     return res.json({email:req.email ,name:req.name})
  });


/*logout*/
router.get("/logout",(req,res)=>{
    res.clearCookie("token");
    return res.json("success")
})
//
module.exports=router;