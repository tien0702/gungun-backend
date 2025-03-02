const { mongo } = require('mongoose');
const { PlayerWeapon } = require('../model/model');

const playerWeaponController = {
    addPlayerWeapon: async (req, res) => {
        try {
            const { playerId, weaponId, weapon, stats, weaponSet } = req.body;
            const playerWeapon = await PlayerWeapon.create({
                playerId,
                weaponId,
                weapon,
                stats,
                weaponSet
            });
            res.status(200).json(playerWeapon);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    getPlayerWeapons: async (req, res) => {
        try {
            const playerWeapons = await PlayerWeapon.find().populate('weaponSet');
            res.status(200).json(playerWeapons);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};
