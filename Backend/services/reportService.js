// services/reportService.js
const Report = require('../models/Report');
const mongoose = require('mongoose');

// Create a new report
const createReport = async (userId, testType, testResults, dateOfTest, statusOfReport,) => {

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid User ID')
  }

  try {
    const report = new Report({
      user: userId,
      testType,
      testResults,
      dateOfTest,
      statusOfReport,
    });
    await report.save();
    return report;
  } catch (err) {
    console.log(err)
    throw new Error('Error creating report');
  }
};

// Get all reports for a user
const getAllReportsByUser = async (userId) => {
  try {
    const reports = await Report.find({ user: userId });
    return reports;
  } catch (err) {
    throw new Error('Error retrieving reports');
  }
};

// Get a single report by ID
const getReportById = async (reportId) => {
  try {
    const report = await Report.findById(reportId);
    return report;
  } catch (err) {
    throw new Error('Error retrieving report');
  }
};

// Update a report by ID
const updateReportById = async (reportId, updatedFields) => {
  try {
    const report = await Report.findByIdAndUpdate(reportId, updatedFields, { new: true });
    return report;
  } catch (err) {
    throw new Error('Error updating report');
  }
};

// Delete a report by ID
const deleteReportById = async (reportId) => {
  try {
    await Report.findByIdAndRemove(reportId);
  } catch (err) {
    throw new Error('Error deleting report');
  }
};

module.exports = {
  createReport,
  getAllReportsByUser,
  getReportById,
  updateReportById,
  deleteReportById,
};
