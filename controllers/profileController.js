const { validationResult } = require('express-validator');
const profileModel = require('../models/profile');
const { body } = require('express-validator');


const updateProfileValidation = [
    body('id').notEmpty().isInt(),
    body('first_name').notEmpty().isAlpha(),
    body('last_name').notEmpty().isAlpha(),
    body('address').optional().isString(),
];

async function getProfile(req, res) {
    try {
        const id = req.body.id;

        if (!id) {
            return res.status(400).json({ error: 'Please provide a valid ID' });
        }

        const profile = await profileModel.getProfile(id);
        res.json(profile);
    } catch (error) {
        throw error;
    }
}

async function updateProfile(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const profileData = {
            id: req.body.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: req.body.address,
        };

        const profile = await profileModel.updateProfile(profileData);
        res.json("Your profile has been updated");
    } catch (error) {
        throw error;
    }
}

async function getBalance(req, res) {
    try {
        const id = req.body.id;

        if (!id) {
            return res.status(400).json({ error: 'Please provide a valid ID' });
        }

        const balance = await profileModel.getBalance(id);
        res.json(`Your balance is: ${balance}€`);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getBalance,
    updateProfile,
    getProfile,
    updateProfileValidation,
};
