const userModel = require('../models/user');
const profileModel = require('../models/profile');
const hash = require('../tools/hash');


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
    const result = await userModel.loginUser(email, password);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

module.exports = {
  loginUser
};




module.exports = {
  loginUser,
  createUser,
};
