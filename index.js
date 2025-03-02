const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');

const authRouter = require('./routes/auth');
const playerRouter = require('./routes/player');
const weaponRouter = require('./routes/weapon');
const equipmentRouter = require('./routes/equipment');
const equipmentSetRouter = require('./routes/equipmentSet');

// Connect to MongoDB
dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB');
    }
    catch(err) {
        console.log('Failed to connect to MongoDB', err);
    }
}

connectDB();
module.exports = connectDB;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(morgan('common'));
// JWT
app.use(cookieParser());
app.use(express.json());

//Routes
app.use('/auth', authRouter);
app.use('/player', playerRouter);
app.use('/weapon', weaponRouter);
app.use('/equipment', equipmentRouter);
app.use('/equipmentSet', equipmentSetRouter);

app.listen(3000, () => {
    console.log('Server is running...');
});

// Authentication

// Authorization