import { Router } from "express";
import Entry, { IEntry } from "../models/Entry";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const entries = await Entry.find();
        res.json(entries);
    } catch (error) {
        res.status(500).json({ message: "Server error "});
    }
});


router.post("/", async (req, res) => {
    try {
        const { restaurant, suggestedBy } = req.body;
        const newEntry = new Entry({ restaurant, suggestedBy });
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(400).json({ message: "Invalid data" });
    }
});

export default router;