const mongoose = require('mongoose');
const User = require('../models/user');

const register = async (req, res) => {
  // Validate message to ensure that all parameters are present
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: 'All fields required' });
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email
  });

  // Set user password
  user.setPassword(req.body.password);

  try {
    await user.save();

    // Return new user token
    const token = user.generateJWT();
    return res.status(200).json(token);
  } catch (err) {
    // Database returned an error
    return res.status(400).json(err);
  }
};

module.exports = {
  register
};
