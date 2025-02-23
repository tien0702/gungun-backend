const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    role: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 0
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

let Auth = mongoose.model('Auth', authSchema);
let Session = mongoose.model('Session', sessionSchema);

module.exports = { Auth, Session };