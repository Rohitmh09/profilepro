import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import conf from "./config/conf.js";
import pool from "./db.js";
import dataRoutes from "./dataRoutes.js";
import mailRoutes from "./mailRoutes.js";
import logger from "./logFile/logger.js";


const saltRounds = 10;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET","DELETE"],
    credentials: true,
  })
);


// Register route
app.post("/register", async  (req, res) => {
  const sql = "CALL RegisterUser(?, ?, ?)";
  
  try {
    const hash = await bcrypt.hash(req.body.password.toString(), saltRounds);
    const values = [req.body.name, req.body.email, hash];
    
    const [result] = await pool.query(sql, values);
    logger.info(`User Registered: ${req.body.name}`);
    return res.json({ Status: "Success" });
  } catch (err) {
    logger.error(`Error registering user: ${err.message}`);
    return res.json({ Error: "Error inserting data", Details: err.message });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const sql = "CALL LoginUser(?)";
  
  try {
    const [data] = await pool.query(sql, [req.body.email]);
    // console.log(data[0]); // show=> [{}]
    if (data[0].length > 0) {
      const match = await bcrypt.compare(req.body.password.toString(), data[0][0].password); 
      
      if (match) {
        const { name, email } = data[0][0];
        const token = jwt.sign({ name, email }, conf.profileproKey, { expiresIn: "1d" }); // (payload,signature,time span)
        res.cookie("token", token);
        logger.info(`User logged in: ${email}`);
        return res.json({ Status: "Success" });
      } 
      else {
        logger.warn(`Login attempt with incorrect password for email: ${req.body.email}`);
      }
     } 
    else {
     logger.warn(`Login attempt for non-existent email: ${req.body.email}`);
    }

    return res.json({ Error: "Invalid email or password" });
  } catch (err) {
    logger.error(`Error logging in: ${err.message}`);
    return res.json({ Error: "Server Error", Details: err.message }); 
  }
});

// Middleware to verify the token
const verifyUser = (req, res, next) => {
  const token = req.cookies.token; // it is extract the token from cookies
  if (!token) 
  {
    logger.info('no token found');
    return res.json({ Error: "No token found" });
  }

  jwt.verify(token, conf.profileproKey, (err, decoded) => {
    if (err)
    {
      logger.error('Token is not valid');
      return res.status(401).json({ Error: "Token is not valid" });
    }
    req.name = decoded.name;
    req.email = decoded.email; // it helps to access the name and email in the protected route
    next();
  });
};

// Protected route 
app.get("/", verifyUser, (req, res) => {
  logger.info(`User accessed protected route: ${req.email}`);
  return res.json({ Status: "Success", name: req.name, email: req.email });
});

// Logout route
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  logger.info(`User logged out`);
  return res.json({ Status: "Success" });
});

app.use('/data', verifyUser, dataRoutes);

app.use('/uploads', express.static('./uploads')); // ./uploads is a file where serve images 

app.use("/mail",mailRoutes);

app.listen(8081, () => {
  logger.info("Server is running on port 8081");
  console.log("Server is running on port 8081");
});
