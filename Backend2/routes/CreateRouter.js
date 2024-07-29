const express = require("express");
const app = express();
const router = express.Router();
const CreateModel = require("../models/CreateModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");

// Middleware
app.use(cookieParser());

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

module.exports = router;
