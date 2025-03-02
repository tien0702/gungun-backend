const { monogo } = require('mongoose');
const { EquipmentSet } = require('../model/model');

const equipmentSetController = {
    addEquipmentSet: async (req, res) => {
        try {
            const { name, description, special } = req.body;
            const equipmentSet = await EquipmentSet.create({
                name,
                description,
                special
            });
            res.status(200).json(equipmentSet);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    getAllEquipmentSets: async (req, res) => {
        try {
            const equipmentSets = await EquipmentSet.find();
            res.status(200).json(equipmentSets);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    getEquipmentSet: async (req, res) => {
        try {
            const equipmentSet = await EquipmentSet
                .findById(req.body.equipmentSetId)
            res.status(200).json(equipmentSet);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = equipmentSetController;