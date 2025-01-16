const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');
const historyRoutes = require('./routes/historyRoutes');

dotenv.config();
const app = express();


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected');

        
        const usersCount = await User.countDocuments();
        if (usersCount === 0) {
            const sampleUsers = [
                { name: 'Rahul' },
                { name: 'Kamal' },
                { name: 'Sakshi' },
                { name: 'Ankit' },
                { name: 'Pooja' },
                { name: 'Ravi' },
                { name: 'Sonal' },
                { name: 'Amit' },
                { name: 'Nisha' },
                { name: 'Vikram' },
            ];

            await User.insertMany(sampleUsers);
            console.log('Sample users added to the database.');
        }
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
connectDB();


app.use(cors());
app.use(bodyParser.json());


app.use('/api/users', userRoutes);
app.use('/api/history', historyRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
