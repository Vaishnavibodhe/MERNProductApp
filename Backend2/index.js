const express =require("express");
const app=express();
const mongoose=require("mongoose");

const UserRouter=require("./routes/UserRouter")
const CreateRouter=require("./routes/CreateRouter")
const path = require("path");
const cors=require("cors");
const cookieParser=require("cookie-parser");
const dotenv=require("dotenv");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/Images', express.static(path.join(__dirname, 'Public/Images'))); // Serve static files

const corsOptions = {
    origin: ["http://localhost:5173","https://frontend-eosin-ten-65.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true 
  };
  
  app.use(cors(corsOptions));
  app.use(cookieParser());

    mongoose.connect(process.env.URI,{ useNewUrlParser: true, useUnifiedTopology: true })
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

app.get("/",(req,res)=>{
res.send("helloworld")
})
app.use(UserRouter);
app.use(CreateRouter);





