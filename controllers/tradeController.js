const tradeModel = require('../models/trade');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


function validatePositiveInt(value) {
  return Number.isInteger(value) && value > 0;
}


function validatePositiveNumber(value) {
  return typeof value === 'number' && value > 0;
}

function validateNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

async function fetchTrades(req, res) {
  try {
    const trades = await tradeModel.fetchTrades();
    res.json(trades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function fetchTrade(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (!validatePositiveInt(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const trade = await tradeModel.fetchTrade(id);
    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    res.json(trade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function fetchOpenTrades(req, res) {
  try {
    const trades = await tradeModel.fetchOpenTrades();
    res.json(trades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function fetchClosedTrades(req, res) {
  try {
    const trades = await tradeModel.fetchClosedTrades();
    res.json(trades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function openTrade(req, res) {
  try {
    const { id, symbol, quantity, open_price } = req.body;

    if (
      !validatePositiveInt(id) ||
      !validateNonEmptyString(symbol) ||
      !validatePositiveInt(quantity) ||
      !validatePositiveNumber(open_price)
    ) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const profile = await prisma.profile.findUnique({ where: { id } });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    if (profile.balance < open_price * quantity) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }

    const tradeData = {
      profile_id: id,
      symbol,
      quantity,
      open_price,
    };

    const trade = await tradeModel.openTrade(tradeData);
    res.json(`You just bought ${quantity} share(s) of ${symbol}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function closeTrade(req, res) {
  try {
    const { id } = req.params;
    const { profile_id, symbol, quantity, close_price } = req.body;

    if (
      !validatePositiveInt(id) ||
      !validatePositiveInt(profile_id) ||
      !validateNonEmptyString(symbol) ||
      !validatePositiveInt(quantity) ||
      !validatePositiveNumber(close_price)
    ) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const tradeData = {
      id: parseInt(id),
      profile_id,
      symbol,
      quantity,
      close_price,
      close_datetime: new Date(),
      open: false,
    };

    const trade = await tradeModel.closeTrade(tradeData);
    res.json(`You just sold ${quantity} share(s) of ${symbol}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function closedPNL(req, res) {
  try {
    const { id } = req.body;

    if (!validatePositiveInt(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const total = await tradeModel.closedPNL(id);
    res.json({ message: `The PNL of your closed trades is ${total}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function openPNL(req, res) {
  try {
    const { id, data } = req.body;

    if (!validatePositiveInt(id) || !Array.isArray(data)) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const total = await tradeModel.openPNL(id, data);
    res.json({ message: `The PNL of your open trades is ${total}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  openPNL,
  closedPNL,
  fetchTrades,
  closeTrade,
  fetchTrade,
  fetchOpenTrades,
  openTrade,
  fetchClosedTrades,
};
