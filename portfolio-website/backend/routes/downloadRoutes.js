const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/resume', (req, res) => {
    const filePath = path.join(__dirname, '../assets/Jiayi YU_Resume.pdf');
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Resume file not found' });
    }
    
    res.download(filePath, 'resume.pdf');
});

module.exports = router;