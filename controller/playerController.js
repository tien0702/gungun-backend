const { monogo } = require('mongoose');
const { Player } = require('../model/model');

const playerController = {
    create: async () => {
        return await Player.create({
            currencies: [
                { name: 'Gold', value: 1000 },
                { name: 'Diamond', value: 0 }
            ]
        });
    },
    getPlayer: async (req, res) => {
        try {
            const player = await Player.findById(req.body.playerId);
            res.status(200).json(player);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    currencyFlow: async (req, res) => {
        try {
            if (req.body.flowType === 'spend') {
                value = -req.body.value;
            }
            else {
                value = req.body.value;
            }
            const updatePlayer = await Player.findOneAndUpdate(
                { _id: req.body.playerId, "currencies.name": req.body.currency },
                { $inc: { "currencies.$.value": value } },
                { new: true }
            );
            res.status(200).json(updatePlayer);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    collectWeapon: async (req, res) => {
        try {
            const updatePlayer = await Player.findOneAndUpdate(
                { _id: req.body.playerId },
                {
                    $push:
                    {
                        ownWeapons: {
                            weaponId: req.body.weaponId,
                            exp: req.body.exp
                        }
                    }
                },
                { new: true }
            );
            res.status(200).json(updatePlayer);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    collectEquipment: async (req, res) => {
        try {
            const updatePlayer = await Player.findOneAndUpdate(
                { _id: req.body.playerId },
                {
                    $push:
                    {
                        ownEquipments: {
                            equipmentId: req.body.equipmentId,
                            exp: req.body.exp
                        }
                    }
                },
                { new: true }
            );
            res.status(200).json(updatePlayer);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    addExpWeapon: async (req, res) => {
        try {
            const updatePlayer = await Player.findOneAndUpdate(
                { _id: req.body.playerId },
                {
                    $inc: { "ownWeapons.$[elem].exp": req.body.exp }
                },
                {
                    new: true,
                    arrayFilters: [{ "elem.weaponId": req.body.weaponId }]
                }
            );
            res.status(200).json(updatePlayer);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    addExpEquipment: async (req, res) => {
        try {
            const updatePlayer = await Player.findOneAndUpdate(
                { _id: req.body.playerId },
                {
                    $inc: { "ownEquipments.$[elem].exp": req.body.exp }
                },
                {
                    new: true,
                    arrayFilters: [{ "elem.equipmentId": req.body.equipmentId }]
                }
            );
            res.status(200).json(updatePlayer);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    equipWeapon: async (req, res) => {
        try {
            const updatePlayer = await Player.findOneAndUpdate(
                { _id: req.body.playerId },
                {
                    $set: {
                        [`equipped.${req.body.location}`]: req.body.locationId
                    }
                },
                { new: true }
            );
            res.status(200).json(updatePlayer);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = playerController;
