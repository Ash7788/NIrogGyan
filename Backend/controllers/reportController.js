const reportService = require('../services/reportService');

// Create a new report
const createReport = async (req, res) => {
  const { user, testType, testResults, dateOfTest, statusOfReport} = req.body;
  try {
    const report = await reportService.createReport(user, testType, testResults, dateOfTest, statusOfReport);
    res.status(201).json({ report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating report' });
  }
};

// Get all reports for a user
const getAllReportsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const reports = await reportService.getAllReportsByUser(userId);
    res.json({ reports });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving reports' });
  }
};

// Get a single report by ID
const getReportById = async (req, res) => {
  const { reportId } = req.params;
  try {
    const report = await reportService.getReportById(reportId);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.json({ report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving report' });
  }
};

// Update a report by ID
const updateReportById = async (req, res) => {
  const { reportId } = req.params;
  const updatedFields = req.body;
  try {
    const report = await reportService.updateReportById(reportId, updatedFields);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.json({ report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating report' });
  }
};

// Delete a report by ID
const deleteReportById = async (req, res) => {
  const { reportId } = req.params;
  try {
    await reportService.deleteReportById(reportId);
    res.json({ message: 'Report deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting report' });
  }
};

module.exports = {
  createReport,
  getAllReportsByUser,
  getReportById,
  updateReportById,
  deleteReportById,
};
