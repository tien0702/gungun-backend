const { mongo } = require('mongoose');
const { User } = require('../model/model');

const userController = {
    create: async () => {
        return await User.create({
            PlayerName: 'Player',
            Exp: 0,
            Gems: 1000,
            Equipments: [{
                LocationId: 'weapon_1',
                Star: 1,
                Status: 0,
                TakeAt: Date.now()
            },
            {
                LocationId: 'shirt_1',
                Star: 1,
                Status: 0,
                TakeAt: Date.now()
            },
            {
                LocationId: 'skirt_1',
                Star: 1,
                Status: 0,
                TakeAt: Date.now()
            }],
            Equippings: ['weapon_1', 'shirt_1', 'skirt_1'],
        });
    },
    update: async (req, res) => {
        const { userId } = req.params;
        const updateData = req.body;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Prevent changing PlayerName if it already exists
            if (updateData.PlayerName  !== undefined) user.PlayerName = updateData.PlayerName;

            // Update simple fields
            if (updateData.Exp !== undefined) user.Exp = updateData.Exp;
            if (updateData.Gems !== undefined) user.Gems = updateData.Gems;
            if (Array.isArray(updateData.LevelPoints)) {
                for (const point of updateData.LevelPoints) {
                    const [stat, valueStr] = point.split('|');
                    const value = parseInt(valueStr);

                    // Skip invalid format or negative value
                    if (!stat || isNaN(value) || value < 0) continue;

                    const existingIndex = user.LevelPoints.findIndex(lp => lp.startsWith(stat + '|'));

                    if (existingIndex !== -1) {
                        // Update existing stat
                        user.LevelPoints[existingIndex] = `${stat}|${value}`;
                    } else {
                        // Add new stat
                        user.LevelPoints.push(`${stat}|${value}`);
                    }
                }
            }

            if (Array.isArray(updateData.Equippings)) {
                user.Equippings = updateData.Equippings;
            }

            // Update existing Equipments by LocationId
            if (Array.isArray(updateData.Equipments)) {
                for (const incomingEquip of updateData.Equipments) {
                    const index = user.Equipments.findIndex(e => e.LocationId === incomingEquip.LocationId);
                    if (index !== -1) {
                        // Found matching equipment → update its properties
                        if (incomingEquip.Star !== undefined) {
                            user.Equipments[index].Star = incomingEquip.Star;
                        }
                        if (incomingEquip.Status !== undefined) {
                            user.Equipments[index].Status = incomingEquip.Status;
                        }
                    } else {
                        // Optional: Add new equipment if not found
                        user.Equipments.push({
                            LocationId: incomingEquip.LocationId,
                            Star: incomingEquip.Star || 1,
                            Status: incomingEquip.Status || 0,
                            TakeAt: Date.now(),
                        });
                    }
                }
            }

            // Allow setting PlayerName if not already set
            if (!user.PlayerName && updateData.PlayerName) {
                user.PlayerName = updateData.PlayerName;
            }

            await user.save();
            return res.status(200).json({ message: 'User updated successfully', data: user });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
    getUser: async (req, res) => {
        const { userId } = req.params;
        console.log(userId);
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json({ data: user });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
};

module.exports = userController;