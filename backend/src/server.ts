import express from "express";
import cors from "cors";
import entriesRouter from "./routes/entries"
import connectDB from "./db";

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://karinaallard.github.io"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
}));

app.use(express.json());

connectDB();

app.use("/api/entries", entriesRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));