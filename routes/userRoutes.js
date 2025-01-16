const express = require('express');
const User = require('../models/User');
const History = require('../models/History');
const router = express.Router();


router.get('/', async (req, res) => {
    const users = await User.find().sort({ points: -1 });
    res.json(users);
});


router.post('/', async (req, res) => {
    const { name } = req.body;
    const newUser = new User({ name });
    await newUser.save();
    res.status(201).json(newUser);
});


router.post('/claim', async (req, res) => {
    const { userId } = req.body;
    const points = Math.floor(Math.random() * 10) + 1;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.points += points;
    await user.save();

    const history = new History({ userId, points });
    await history.save();

    res.json({ user, points });
});

module.exports = router;
