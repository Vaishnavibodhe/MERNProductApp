const express=require("express")
const {CreateModel} = require("../models/CreateModel");
const multer = require("multer");
const path = require("path");
const createRouter = express.Router()
const { auth } = require("../middleware/auth.middleware");

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
  
  createRouter.post("/create", upload.single('file'), (req, res) => {
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
  createRouter.get("/getproducts", (req, res) => {
    CreateModel.find({})
      .then(products => res.json(products))
      .catch(err => res.status(500).json({ error: 'Failed to fetch products' }));
  });
  createRouter.get("/getproductbyid/:id",(req,res)=>{
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
  createRouter.delete("/deleteproduct/:id",(req,res)=>{
    const {id} =req.params;
    CreateModel.findByIdAndDelete(id)
    .then(result => res.json("success"))
    .catch(err => res.json(err))
  })
  module.exports = {
createRouter,
  };
  