import { Router } from "express";
import Entry, { IEntry } from "../models/Entry";
import mongoose from "mongoose";

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

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }
        
        const updatedEntry = await Entry.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedEntry) return res.status(404).json({ message: "Entry not found" });
        res.json(updatedEntry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

export default router;