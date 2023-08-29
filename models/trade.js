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

module.exports = {
    fetchTrades
}