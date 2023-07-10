// models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  testType: {
    type: String,
    required: true,
  },
  dateOfTest:{
    type: String,
    required: true,
  },
  statusOfReport:{
    type: String,
    required: true,
  },
  testResults: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
