const wireModel = require('../models/wire');

async function makeWire(req,res){
    try {
        const wireData = {

            profile_id : req.body.id,
            amount : req.body.amount,
            withdrawal : req.body.withdrawal
        };
        const wire = await wireModel.makeWire(wireData)
        res.json(`Wire made`);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
}
}

module.exports = {
    makeWire
};