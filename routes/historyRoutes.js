const express = require('express');
const History = require('../models/History');
const router = express.Router();


router.get('/', async (req, res) => {
    const history = await History.find().populate('userId', 'name').sort({ date: -1 });
    res.json(history);
});

module.exports = router;
