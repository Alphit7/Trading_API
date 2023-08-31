const tradeModel = require('../models/trade');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


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
        const profile = await prisma.profile.findUnique({where: {id: tradeData.profile_id}})
        if (profile.balance >= tradeData.open_price * tradeData.quantity){

        const trade = await tradeModel.openTrade(tradeData)
        res.json(`you just bought ${tradeData.quantity} share(s) of ${tradeData.symbol}`)
        } else{
            res.json("You don't have enough fonds in your balance");
        }
    } catch (error){
        throw error;
    }
}

async function closeTrade(req,res){
    try{
        const tradeData = {
            id: parseInt(req.params.id),
            profile_id: req.body.profile_id,
            symbol: req.body.symbol,
            quantity: req.body.quantity,
            close_price: req.body.close_price,
            close_datetime: new Date(),
            open: false
        }
        const trade = await tradeModel.closeTrade(tradeData)
        res.json(`you just sold ${tradeData.quantity} share(s) of ${tradeData.symbol}`)
    } catch (error){
        throw error;
    }
}

module.exports = {
    fetchTrades,
    closeTrade,
    fetchTrade,
    fetchOpenTrades,
    openTrade,
    fetchClosedTrades
}