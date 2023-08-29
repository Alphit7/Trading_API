const tradeModel = require('../models/trade');

async function fetchTrades(req,res){
    try {
    const trades =await tradeModel.fetchTrades()
        res.json(trades);
    }
    catch (error){
        throw error;
    }
}

module.exports = {
    fetchTrades
}