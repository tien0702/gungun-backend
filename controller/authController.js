const { mongo } = require('mongoose');
const { Auth } = require('../model/model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
    register: async (req, res) => {
        try {
            const salt = await bcryptjs.genSalt(10);
            const hashed = await bcryptjs.hash(req.body.password, salt);

            const newAuth = new Auth({
                userName: req.body.userName,
                email: req.body.email,
                password: hashed
            });

            const checkAcc = await Auth.findOne({ userName: newAuth.userName });

            if (checkAcc) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            await newAuth.save();
            res.status(200).json({ msg: 'Register successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    genAccessToken: (user) => {
        return jwt.sign(
            {
                id: user._id,
                role: user.role
            }, process.env.JWT_ACCESS_KEY,
            {
                expiresIn: '30m'
            });
    },
    genRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user._id,
                role: user.role
            }, process.env.JWT_REFRESH_KEY,
            {
                expiresIn: '356d'
            });
    },
    login: async (req, res) => {
        try {
            const user = await Auth.findOne({ userName: req.body.userName });
            if (!user) {
                return res.status(404).json('Wrong username');
            }

            const validPassword = await bcryptjs.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(400).json('Wrong password');
            }

            if (user.status === -1) {
                return res.status(400).json('Account is locked');
            }

            if (user && validPassword) {
                const accessToken = authController.genAccessToken(user);
                const refreshToken = authController.genRefreshToken(user);
                const { password, ...info } = user._doc;
                res.status(200).json({ ...info, accessToken, refreshToken });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    requestRefreshToken: async (req, res) => {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            return res.status(403).json({ message: 'No fresh token provided' });
        }

        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
            const user = Auth.findById(decoded.id);

            if (!user) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }

            const newAccessToken = authController.genAccessToken(user);
            res.status(200).json({ accessToken: newAccessToken });
        } catch (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
    }
};

module.exports = authController;