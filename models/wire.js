const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function makeWire(wireData) {
    try {
        const wire = await prisma.wire.create({ data: wireData });

        const profile = await prisma.profile.findUnique({
            where: { id: wireData.profile_id }
        });

        if (!profile) {
            throw new Error(`Profile with id ${wireData.profile_id} not found.`);
        }

        let newBalance;
        if(wireData.withdrawal === false){
        newBalance = profile.balance + wireData.amount;
        }else{
            newBalance = profile.balance - wireData.amount;
        }
        const updatedProfile = await prisma.profile.update({
            where: { id: wireData.profile_id },
            data: { balance: newBalance }
        });

        console.log('Wire transaction and profile balance update successful.');
    } catch (error) {
        console.error('An error occurred:', error.message);
    } finally {
        await prisma.$disconnect(); 
    }
}

module.exports = {
    makeWire
};
