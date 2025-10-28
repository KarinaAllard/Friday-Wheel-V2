import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const filePath = path.resolve("./src/data/entries.json");

router.get("/", (req, res) => {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    res.json(data);
});

router.post("/", (req, res) => {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const newEntry = req.body;

    data.push(newEntry);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.status(201).json(newEntry);
})

export default router;