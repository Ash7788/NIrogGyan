const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const reportController = require('../controllers/reportController');

/* User Routes */ 

// Register post route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with bcrypt

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    const userData = { email: newUser.email, username: newUser.username, _id: newUser._id };
    res.status(201).json({ message: 'Registration successful', user: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login post route

router.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: "credentials are not valid",
  }),
  function (req, res) {
    console.log(req);
    const userData = {
      username: req.user.username,
      email: req.user.email,
      _id: req.user._id,
    };
    res.status(200).json({ message: 'Login Successful', user: userData });
  }
);
  
  // Logout route

  router.delete("/logout", function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(JSON.stringify(err));
        }
    });
    res.status(204).json({ message: 'Logout Successful'});
});

/* Report Routes */

  // Create a new report
router.post('/report', reportController.createReport);

// Get all reports for a user
router.get('/report/user/:userId', reportController.getAllReportsByUser);

// Get a single report by ID
router.get('/report/:reportId', reportController.getReportById);

// Update a report by ID
router.put('/report/:reportId', reportController.updateReportById);

// Delete a report by ID
router.delete('/report/:reportId', reportController.deleteReportById);

module.exports = router;
