import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import connectDB from "./db/db";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

connectDB();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/auth", authRoutes);
// app.use("/api/employee");

app.listen(port, () => {
  console.log("Listening on", port);
});
