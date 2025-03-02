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
    playerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
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

const currencySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        default: 0
    }
});

const statSchema = new mongoose.Schema({
    statId: {
        type: String
    },
    value: {
        type: Number,
        default: 0
    }
});

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    cost: {
        type: Number,
        default: 0
    },
    requireLevel: {
        type: Number,
        default: 1
    },
});

const weaponSchema = new mongoose.Schema({
    weapId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    type: {
        type: String,
        enum: ['physical', 'magical'],
        required: true
    },
    baseAtk: [Number],
    star: {
        type: Number,
        default: 4
    },
    skill: [skillSchema],
    stats: [statSchema],
});

const equipmentSet = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    special: {
        type: String
    }
});

const equipmentSchema = new mongoose.Schema({
    location: {
        type: String,
        enum: ['hat', 'hair', 'shirt', 'skirt', 'shoe'],
        required: true
    },
    localtionId: {
        type: Number,
        required: true
    },
    stats: [statSchema],
    equipmentSet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EquipmentSet'
    }
});

const playerWeaponSchema = new mongoose.Schema({
    weaponId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Weapon',
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    exp: {
        type: Number,
        default: 0
    },
    takeAt: {
        type: Date,
        default: Date.now
    }
});

const playerEquipmentSchema = new mongoose.Schema({
    equipmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment',
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    exp: {
        type: Number,
        default: 0
    },
    takeAt: {
        type: Date,
        default: Date.now
    }
});

const playerSchema = new mongoose.Schema({
    playerName: {
        type: String,
        default: 'Player',
        required: true
    },
    exp: {
        type: Number,
        default: 0
    },
    currencies: [currencySchema],
    ownEquipments: [playerEquipmentSchema],
    ownWeapons: [playerWeaponSchema],
    equipped: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerEquipment'
    }],
    weapEquipped: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerWeapon'
    },
});

let Auth = mongoose.model('Auth', authSchema);
let Session = mongoose.model('Session', sessionSchema);
let Weapon = mongoose.model('Weapon', weaponSchema);
let Player = mongoose.model('Player', playerSchema);
let Skill = mongoose.model('Skill', skillSchema);
let Equipment = mongoose.model('Equipment', equipmentSchema);
let EquipmentSet = mongoose.model('EquipmentSet', equipmentSet);

module.exports = {
    Auth,
    Session,
    Weapon,
    Player,
    Skill,
    Equipment,
    EquipmentSet
};
