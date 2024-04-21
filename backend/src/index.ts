import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import foodRoutes from "./routes/food.routes";
import connectDB from "./db/db";
import cookieParser from 'cookie-parser';
import protectedRoute from "./middleware/protectedRoute";


dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser())
app.use(express.json());

const port = process.env.PORT || 5000;

connectDB();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/auth", authRoutes);
app.use("/api/food",foodRoutes);

app.listen(port, () => {
  console.log("Listening on", port);
});
