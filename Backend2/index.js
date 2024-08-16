const express =require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors");
const cookieParser=require("cookie-parser");
const UserModel =require("./models/UserModel");
const CreateModel = require("./models/CreateModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const dotenv=require("dotenv");
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/Images', express.static(path.join(__dirname, 'Public/Images'))); // Serve static files

const corsOptions = {
    origin: ["http://localhost:5173" ],
    methods: ["GET", "POST",  "DELETE"], 
    credentials: true 
  };
  
  app.use(cors(corsOptions));
 


/*for sign up*/
app.post("/signup",(req,res)=>{
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
app.post("/login",(req,res)=>{
    const {email,password}=req.body;
    UserModel.findOne({email:email})
    .then(user =>{
       if(user){
        bcrypt.compare(password,user.password,(err,response)=>{
            if(response){
                const token=jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY,{expiresIn:'1h'})
                res.cookie('token', token)
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
  
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token is invalid" });
      }
      req.email = decoded.email;
      req.name = decoded.name;
      next();
    });
  };
  
  
  // Route to get user data
  app.get('/', verifyUser, (req, res) => {
    
     return res.json({email:req.email ,name:req.name})
  });


/*logout*/
app.get("/logout",(req,res)=>{
    res.clearCookie("token");
  return res.json("success")
})
// Store file for image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } 
});

//creating  products

app.post("/create", verifyUser, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  CreateModel.create({
    file: req.file.filename,
    name: req.body.name,
    price: req.body.price,
    discount: req.body.discount,
    bgcolor: req.body.bgcolor,
    panelcolor: req.body.panelcolor,
    textcolor: req.body.textcolor
  })
  .then(result => res.json(result))
  .catch(err => res.status(500).json({ error: 'Failed to create product' }));
});

// Get Products
app.get("/getproducts", (req, res) => {
  CreateModel.find({})
    .then(products => res.json(products))
    .catch(err => res.status(500).json({ error: 'Failed to fetch products' }));
});
app.get("/getproductbyid/:id",(req,res)=>{
  const {id }= req.params;
  CreateModel.findById(id)
  .then(product => {
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  })
  .catch(err => res.status(500).json({ error: 'Failed to fetch product' }));
})
/*delete product by id*/
app.delete("/deleteproduct/:id",(req,res)=>{
  const {id} =req.params;
  CreateModel.findByIdAndDelete(id)
  .then(result => res.json("success"))
  .catch(err => res.json(err))
})


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





