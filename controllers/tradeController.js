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

async function fetchTrade(req,res){
    try {
        const id = parseInt(req.params.id)
        const trade = await tradeModel.fetchTrade(id);
        res.json(trade);
    } catch (error){
        throw error;
    }
}

module.exports = {
    fetchTrades,
    fetchTrade
}