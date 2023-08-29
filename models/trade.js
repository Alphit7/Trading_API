const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function fetchTrades(){
    try {
        const trades = await prisma.trade.findMany();
        return trades;
    }
    catch (error){
        throw error;
    }
}

async function fetchTrade(id){
    try {
        const trade = await prisma.trade.findUnique({where: {id}})
        if (trade){
        return trade;
        }
        else{return "Trade not found"}
    } catch (error){
        throw error;
    }
}

async function fetchOpenTrades(){
    try {
        const trades = await prisma.trade.findMany({where: {open: true}})
        if (trades){
        return trades;
        }
        else{return "Trade not found"}
    } catch (error){
        throw error;
    }
}

async function fetchClosedTrades(){
    try {
        const trades = await prisma.trade.findMany({where: {open: false}})
        if (trades){
        return trades;
        }
        else{return "Trade not found"}
    } catch (error){
        throw error;
    }
}

async function openTrade(tradeData){
    const trade = await prisma.trade.create({data: tradeData})
    return trade;
}


module.exports = {
    fetchTrades,
    fetchTrade,
    fetchOpenTrades,
    fetchClosedTrades,
    openTrade
}