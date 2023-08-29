const userModel = require('../models/user');
const profileModel = require('../models/profile');
const hash = require('../tools/hash');
const bcrypt = require('bcrypt');

async function createUser(req, res) {
  try {
    const userData = {
      email: req.body.email,
      name: req.body.name,
      password: await hash(req.body.password),
    };

    const profileData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address: req.body.address,
    };

    const userAndProfile = await userModel.createUserWithProfile(userData, profileData);

    res.json(`Succesfuly signed up welcome ${profileData.first_name} `);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.getUserByEmail(email);

    if (user) {
      
      const passwordMatches = await bcrypt.compare(password, user.password);

      if (passwordMatches) {
        res.json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Authentication failed' });
      }
    } else {
      res.status(401).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}



module.exports = {
  loginUser,
  createUser,
};
