const profileModel = require('../models/profile');

async function getProfile(req,res){
    try{
    const id = req.body.id

    const profile = await profileModel.getProfile(id)
    res.json(profile);
    }
    catch (error){
        throw error
    }
}

async function updateProfile(req,res){
    try{
        const profileData = {
            id: req.body.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: req.body.address 
        }
        const profile = await profileModel.updateProfile(profileData);
        res.json("Your profile has been updated")
    }
    catch (error){
        throw error;
    }
}

module.exports = {
    updateProfile,
    getProfile
};