const { PrismaClient } = require('@prisma/client');
const { idle_in_transaction_session_timeout } = require('pg/lib/defaults');
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

async function openTrade(tradeData) {
    try {
        const trade = await prisma.trade.create({ data: tradeData });
        const profile = await prisma.profile.findUnique({ where: { id: tradeData.profile_id } });

        const newBalance = profile.balance - (tradeData.quantity * tradeData.open_price);
        const updateProfile = await prisma.profile.update({ where: { id: profile.id }, data: { balance: newBalance } });

        return trade;
    } catch (error) {
        // Handle the error here, you can log or throw it further if needed
        console.error("Error in openTrade:", error);
        throw error;
    }
}

async function closeTrade(tradeData) {
    try {
        const trade = await prisma.trade.update({
            where: { id: tradeData.id },
            data: {
                close_price: tradeData.closePrice,
                close_datetime: tradeData.close_datetime,
                open: tradeData.open,
            },
        });
        
        const profile = await prisma.profile.findUnique({ where: { id: tradeData.profile_id } });

        if (!profile) {
            throw new Error(`Profile with id ${tradeData.profile_id} not found.`);
        }

        const newBalance = profile.balance + tradeData.quantity * tradeData.close_price;
        const updatedProfile = await prisma.profile.update({where: {id: tradeData.profile_id}, data: {balance: newBalance}})

    } catch (error) {
        console.error("Error in closeTrade:", error);
        throw error;
    }
}


module.exports = {
    closeTrade,
    fetchTrades,
    fetchTrade,
    fetchOpenTrades,
    fetchClosedTrades,
    openTrade
}