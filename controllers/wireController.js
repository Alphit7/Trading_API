const wireModel = require('../models/wire');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function validatePositiveInt(value) {
  return Number.isInteger(value) && value > 0;
}

async function makeWire(req, res) {
  try {
    const { id, amount, withdrawal } = req.body;

    if (!validatePositiveInt(id) || !validatePositiveInt(amount) || typeof withdrawal !== 'boolean') {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const wireData = {
      profile_id: id,
      amount,
      withdrawal,
    };

    if (wireData.withdrawal === true) {
      const profile = await prisma.profile.findUnique({ where: { id: wireData.profile_id } });

      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      if (profile.balance >= wireData.amount) {
        const wire = await wireModel.makeWire(wireData);
        res.json('Withdrawal made');
      } else {
        res.json("You don't have enough money in your balance");
      }
    } else {
      const wire = await wireModel.makeWire(wireData);
      res.json('Deposit made');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

module.exports = {
  makeWire,
};
