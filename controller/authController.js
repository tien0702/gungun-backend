const { mongo } = require('mongoose');
const { Auth, User } = require('../model/model');
const userController = require('./userController');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
    register: async (req, res) => {
        try {
            const checkAcc = await Auth.findOne({ userName: req.body.userName });

            if (checkAcc) {
                return res.status(400).json('User already exists');
            }

            const newUser = await userController.create();

            const salt = await bcryptjs.genSalt(10);
            const hashed = await bcryptjs.hash(req.body.password, salt);
            const newAuth = new Auth({
                userName: req.body.userName,
                email: req.body.email,
                password: hashed,
                userId: newUser._id
            });

            await newAuth.save();
            res.status(200).json('Register successfully');
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
                expiresIn: '30d'
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
            const auth = await Auth.findOne({ userName: req.body.userName });
            if (!auth) {
                return res.status(404).json('Incorrect account or password');
            }

            const validPassword = await bcryptjs.compare(req.body.password, auth.password);
            if (!validPassword) {
                return res.status(400).json('Incorrect account or password');
            }

            if (auth.status === -1) {
                return res.status(400).json('Account is locked');
            }

            if (auth && validPassword) {
                const accessToken = authController.genAccessToken(auth);
                const refreshToken = authController.genRefreshToken(auth);
                const { password, ...info } = auth._doc;
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