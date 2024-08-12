const express=require("express");
const app=express();
const router=express.Router();
const UserModel =require("../models/UserModel");
const CreateModel = require("../models/CreateModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser")
const multer = require("multer");
const path = require("path");

app.use(cookieParser());
app.use(express.json());

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
                const token=jwt.sign({email:user.email}, "secret",{expiresIn:'1h'})
                res.cookie("token",token, {httpOnly: true,secure: false });
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
  storage: storage
});

//creating  products

router.post("/create", verifyUser, upload.single('file'), (req, res) => {
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
router.get("/getproducts", (req, res) => {
  CreateModel.find({})
    .then(products => res.json(products))
    .catch(err => res.status(500).json({ error: 'Failed to fetch products' }));
});
router.get("/getproductbyid/:id",(req,res)=>{
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
router.delete("/deleteproduct/:id",(req,res)=>{
  const {id} =req.params;
  CreateModel.findByIdAndDelete(id)
  .then(result => res.json("success"))
  .catch(err => res.json(err))
})

module.exports=router;