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
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    ,
    createAt: {
        type: Date,
        default: Date.now
    }
});

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth'
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

const userEquipmentSchema = new mongoose.Schema({
    LocationId: {
        type: String,
        required: true
    },
    Star: {
        type: Number,
        default: 1
    },
    Status: {
        type: Number,
        default: 0
    },
    TakeAt: {
        type: Date,
        default: Date.now
    }
})

const userSchema = new mongoose.Schema({
    PlayerName: {
        type: String,
        required: true
    },
    Exp: {
        type: Number,
        default: 0
    },
    Gems: {
        type: Number,
        default: 1000
    },
    LevelPoints: [{
        type: String
    }],
    Equipments: [userEquipmentSchema],
    Equippings: [{
        type: String
    }],
})

let User = mongoose.model('UserData', userSchema);

let Auth = mongoose.model('Auth', authSchema);
let Session = mongoose.model('Session', sessionSchema);

module.exports = {
    User,
    Auth,
    Session
};
