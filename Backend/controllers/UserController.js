const User = require('../models/User');

// Get user by ID
const getUserById = (id, callback) => {
  User.findById(id, (err, user) => {
    if (err) {
      console.error(err);
      return callback(err);
    }
    callback(null, user);
  });
};

module.exports = {
  getUserById,
};
