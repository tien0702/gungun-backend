const { monogo } = require('mongoose');
const { Equipment } = require('../model/model');

const equipmentController = {
    addEquipment: async (req, res) => {
        try {
            const { localtionId, location, stats, equipmentSet } = req.body;
            const equipment = await Equipment.create({
                localtionId,
                location,
                stats,
                equipmentSet
            });
            res.status(200).json(equipment);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    getAllEquipments: async (req, res) => {
        try {
            const equipments = await Equipment.find().populate('equipmentSet');
            res.status(200).json(equipments);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = equipmentController;