const { Router } = require("express");
const express=require('express')
const app=express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {UserModel} = require("../models/UserModel");
const cookieParser=require("cookie-parser");

const userrouter = Router();

app.use(cookieParser())
userrouter.get("/", (req, res) => {
  res.send("please login");
});
userrouter.post("/signup", async (req, res) => {
    const { email,password,confirm_password } = req.body;
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        // Store hash in your passwordword DB.
        const userer = new UserModel({ email,confirm_password,password: hash });
        await userer.save();
        res.send({ msg: "new user registered" });
      });
    } catch (error) {
      res.send(error);
    }
  });
  userrouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    try {
      const user = await UserModel.findOne({ email });
      console.log("user",user)
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            // console.log(user)
            const token = jwt.sign({ authorid: user._id }, "masai");
            
            const email=user.email
  
            res.status(200).send({ msg: "login successfull", token: token,email });
          } else {
            res.status(200).send({ msg: "wrong" });
          }
          // result == false
        });
      } else {
        res.status(200).send({ msg: "wrong user" });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });
  userrouter.get("/logout",(req,res)=>{
    res.clearCookie("token");
  return res.json("success")
})
  
  module.exports = {
    userrouter,
  };