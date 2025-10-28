import express from "express";
import cors from "cors";
import entriesRouter from "./routes/entries"
import connectDB from "./db";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/entries", entriesRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));