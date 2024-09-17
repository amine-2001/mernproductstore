import express from "express";
import  dotenv  from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from './routes/product.route.js';  // Adjust the path as needed
import authRoutes from './routes/auth.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/api/products",productRoutes);
app.use("/api/auth", authRoutes);


console.log("MONGO_URI:", process.env.MONGO_URI);

app.listen(PORT,()=>{
    connectDB();
    console.log("server started at http://localhost:"+ PORT);

});


//