import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

import authRoutes from "./routes/authRoutes.js";
import willRoutes from "./routes/willRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import beneficiaryRoutes from "./routes/beneficiaryRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/wills", willRoutes);
app.use("/api/v1/documents", documentRoutes);
app.use("/api/v1/beneficiaries", beneficiaryRoutes);
app.use("/api/v1/admin", adminRoutes);

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running." });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});