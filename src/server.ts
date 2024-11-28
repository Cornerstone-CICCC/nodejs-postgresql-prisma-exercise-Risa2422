// Set up your server
import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/product.routes";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/products", productRouter);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log("Server is running");
});
