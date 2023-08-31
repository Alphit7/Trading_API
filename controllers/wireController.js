const wireModel = require('../models/wire');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function makeWire(req,res){
    try {
        const wireData = {

            profile_id : req.body.id,
            amount : req.body.amount,
            withdrawal : req.body.withdrawal
        };
        if(wireData.withdrawal === true){
        const profile = await prisma.profile.findUnique({where: {id: wireData.profile_id}})
        if (profile.balance >= wireData.amount){
        const wire = await wireModel.makeWire(wireData)
        res.json(`Withrawal made`);
    }else{res.json("You don't have enough money in your balance")}
} else {const wire = await wireModel.makeWire(wireData)
res.json(`Deposit made`);}
}
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
}
}

module.exports = {
    makeWire
};