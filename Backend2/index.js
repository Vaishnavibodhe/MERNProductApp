const express =require("express");
const app = express();
const path = require("path");

require("dotenv").config();
const cors = require("cors");
const { connection } = require("./config/db");

// user
const { userrouter } = require("./routes/user.route");
const { createRouter } = require("./routes/create.route");
// auth
const { auth } = require("./middleware/auth.middleware");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
     res.send("please login");
   });
// user

app.use(express.urlencoded({ extended: true }));
app.use('/Images', express.static(path.join(__dirname, 'Public/Images'))); // Serve static files

app.use("/users", userrouter);
app.use("/admin", createRouter);
  
  
  // Route to get user data
  

/*logout*/




app.listen(process.env.port, async () => {
  try {
      await connection
      
      console.log(`Server is running at port ${process.env.port}`);
      console.log("Connected to DB");
  } catch (error) {
      console.log(error.message);
  }
})




