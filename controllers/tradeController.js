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

async function fetchOpenTrades(req,res){
    try {
    const trades =await tradeModel.fetchOpenTrades()
        res.json(trades);
    }
    catch (error){
        throw error;
    }
}

async function fetchClosedTrades(req,res){
    try {
    const trades =await tradeModel.fetchClosedTrades()
        res.json(trades);
    }
    catch (error){
        throw error;
    }
}

async function openTrade(req,res){
    try{
        const tradeData = {
            profile_id: req.body.id,
            symbol: req.body.symbol,
            quantity: req.body.quantity,
            open_price: req.body.open_price,
        }
        const trade = await tradeModel.openTrade(tradeData)
        res.json(`you just bought ${tradeData.quantity} share(s) of ${tradeData.symbol}`)
    } catch (error){
        throw error;
    }
}

module.exports = {
    fetchTrades,
    fetchTrade,
    fetchOpenTrades,
    openTrade,
    fetchClosedTrades
}