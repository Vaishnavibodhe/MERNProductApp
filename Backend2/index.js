const express =require("express");
const app=express();
const mongoose=require("mongoose");
const UserRouter=require("./routes/UserRouter")
const path = require("path");
const cors=require("cors");
const cookieParser=require("cookie-parser");
const dotenv=require("dotenv");
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/Images', express.static(path.join(__dirname, 'Public/Images'))); // Serve static files

const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST",  "DELETE"], 
    credentials: true 
  };
  
  app.use(cors(corsOptions));
 

    mongoose.connect(process.env.URI)
    .then(()=>{
        console.log("mongodb connected");
    
        const PORT = process.env.PORT || 5000;
    app.listen(PORT,()=>{
        console.log(`server is running on ${PORT} `)
    })
})
.catch((err)=>{
    console.log("connecting to MongoDB:",err)
})


app.use(UserRouter);






