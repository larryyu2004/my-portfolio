const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const markdownFiles = path.join(__dirname, "../../frontend/public/markdown/markdownContent");

router.get("/list", (req, res) => {
    fs.readdir(markdownFiles, (err, files) => {
        if (err) {
            console.error("Error reading markdown files:", err);
            return res.status(500).json({ error: "Error reading markdown files" });
        }

        const markdownFiles = files.filter(file => file.endsWith(".md"));

        res.json({ markdownFiles });
    });
});

module.exports = router;