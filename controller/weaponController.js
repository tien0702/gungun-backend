const { monogo } = require('mongoose');
const { Weapon } = require('../model/model');

const weaponController = {
    addWeapon: async (req, res) => {
        try {
            const weapon = await Weapon.create({
                weapId: req.body.weapId,
                name: req.body.name,
                description: req.body.description,
                type: req.body.type,
                baseAtk: req.body.baseAtk,
                star: req.body.star,
                skill: req.body.skill,
                stats: req.body.stats
            });
            res.status(200).json(weapon);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    getAllWeapons: async (req, res) => {
        try {
            const weapons = await Weapon.find();
            res.status(200).json(weapons);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = weaponController;
