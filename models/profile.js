const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getProfile(id){
    try{
        const profile = await prisma.profile.findUnique({
            where: {id}
})
        return profile;
    }
    catch(error) {
        throw error;
    }
}

async function updateProfile(profileData){
    try{
        const profile = await prisma.profile.update(
            {where: {id: profileData.id},
            data: {first_name: profileData.first_name,
            last_name: profileData.last_name,
            address: profileData.address}})
    }
    catch (error){
        throw error;
    }
}


module.exports = {
    getProfile,
    updateProfile
};