const userModel = require('../models/user');
const profileModel = require('../models/profile');
const hash = require('../tools/hash');

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

async function createUser(req, res) {
  try {
    const { email, name, password, first_name, last_name, address } = req.body;

    if (
      !validateEmail(email) ||
      !validateNonEmptyString(name) ||
      !validateNonEmptyString(password) ||
      !validateNonEmptyString(first_name) ||
      !validateNonEmptyString(last_name) ||
      !validateNonEmptyString(address)
    ) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const userData = {
      email,
      name,
      password: await hash(password),
    };

    const profileData = {
      first_name,
      last_name,
      address,
    };

    const userAndProfile = await userModel.createUserWithProfile(userData, profileData);

    res.json(`Successfully signed up. Welcome, ${profileData.first_name}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!validateEmail(email) || !validateNonEmptyString(password)) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const result = await userModel.loginUser(email, password);

    if (!result) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

module.exports = {
  createUser,
  loginUser,
};
