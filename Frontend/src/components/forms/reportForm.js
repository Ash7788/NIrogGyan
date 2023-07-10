import React, { useState } from 'react';
import axios from 'axios';
import { FormControl, Select, MenuItem, Button, TextField, Typography, InputLabel } from '@mui/material';
import './reportForm.css';
import Swal from 'sweetalert2';

const ReportForm = ({ user, setOpen }) => {
  const [formData, setFormData] = useState({
    user: user._id,
    testType: '',
    testResults: {},
    statusOfReport: '',
    dateOfTest:'',
  });

  console.log(formData)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, statusOfReport: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Construct the API request payload based on the testType
    const payload = {
      user: formData.user,
      testType: formData.testType,
      statusOfReport: formData.statusOfReport,
      dateOfTest: formData.dateOfTest,
      testResults: {},
    };

    if (formData.testType === 'Cancer Screening Test') {
      payload.testResults.age = parseFloat(formData.age);
      payload.testResults.accessionNumber = formData.accessionNumber;
      payload.testResults.PSAT = parseFloat(formData.PSAT);
      payload.testResults.CA125 = parseFloat(formData.CA125);
      payload.testResults.CEA = parseFloat(formData.CEA);
      payload.testResults.AFP = parseFloat(formData.AFP);
      payload.testResults.CA19_9 = parseFloat(formData.CA19_9);
      payload.testResults.CA15_3 = parseFloat(formData.CA15_3);
      payload.testResults.CA27_29 = parseFloat(formData.CA27_29);
    } else if (formData.testType === 'Lipid Profile Test') {
      payload.testResults.age = parseFloat(formData.age);
      payload.testResults.accessionNumber = formData.accessionNumber;
      payload.testResults['Total Cholesterol'] = parseFloat(formData.totalCholesterol);
      payload.testResults['HDL Cholesterol'] = parseFloat(formData.HDL);
      payload.testResults['VLDL Cholesterol'] = parseFloat(formData.VLDL);
      payload.testResults['LDL Cholesterol'] = parseFloat(formData.LDL);
      payload.testResults['Triglycerides'] = parseFloat(formData.triglycerides);
      payload.testResults['Total Cholesterol/HDL Ratio'] = parseFloat(formData.totalCholesterolHDLRatio);
      payload.testResults['Triglyceride to HDL Ratio'] = parseFloat(formData.triglyceridesHDLRatio);
      payload.testResults['HDL to LDL Ratio'] = parseFloat(formData.HDLLDLRatio);
    }

    axios
      .post('http://localhost:5001/report', payload)
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: "Report Added Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        setOpen(false);
        console.log(res)
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
          showConfirmButton: false,
          timer: 2000
        });
      });
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <Typography padding={"5px"} id="testType-label">Test Type</Typography>
        <Select
          style={{width: "230px"}}
          labelId="testType-label"
          id="testType"
          name="testType"
          value={formData.testType}
          onChange={handleInputChange}
        >
          <MenuItem value="">Select a test type</MenuItem>
          <MenuItem value="Cancer Screening Test">Cancer Screening Test</MenuItem>
          <MenuItem value="Lipid Profile Test">Lipid Profile Test</MenuItem>
        </Select>
      </FormControl>
      <Typography>Date of Test</Typography>
      <TextField
        type="date"
        id="dateOfTest"
        name="dateOfTest"
        value={formData.dateOfTest}
        onChange={handleInputChange}
        fullWidth
      />
      {formData.testType === 'Cancer Screening Test' && (
        <div className="form-field">
        <Typography>Test Details</Typography>
        <TextField
            type="text"
            id="accessionNumber"
            name="accessionNumber"
            label="Accession Number"
            value={formData.accessionNumber}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            type="number"
            id="age"
            name="age"
            label="Age"
            value={formData.age}
            onChange={handleInputChange}
            fullWidth
          />
        <TextField
          type="number"
          id="PSAT"
          name="PSAT"
          label="PSAT"
          value={formData.PSAT}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          type="number"
          id="CA125"
          name="CA125"
          label="CA125"
          value={formData.CA125}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          type="number"
          id="CEA"
          name="CEA"
          label="CEA"
          value={formData.CEA}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          type="number"
          id="AFP"
          name="AFP"
          label="AFP"
          value={formData.AFP}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          type="number"
          id="CA19_9"
          name="CA19_9"
          label="CA19-9"
          value={formData.CA19_9}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          type="number"
          id="CA15_3"
          name="CA15_3"
          label="CA15-3"
          value={formData.CA15_3}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          type="number"
          id="CA27_29"
          name="CA27_29"
          label="CA27-29"
          value={formData.CA27_29}
          onChange={handleInputChange}
          fullWidth
        />
      </div>
      )}
      {formData.testType === 'Lipid Profile Test' && (
        <div className="form-field">
          <Typography>Test Details</Typography>
          <TextField
            type="text"
            id="accessionNumber"
            name="accessionNumber"
            label="Accession Number"
            value={formData.accessionNumber}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            type="number"
            id="age"
            name="age"
            label="Age"
            value={formData.age}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            type="number"
            id="totalCholesterol"
            name="totalCholesterol"
            label="Total Cholesterol"
            value={formData.totalCholesterol}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            type="number"
            id="HDL"
            name="HDL"
            label="HDL Cholesterol"
            value={formData.HDL}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            type="number"
            id="VLDL"
            name="VLDL"
            label="VLDL Cholesterol"
            value={formData.VLDL}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            type="number"
            id="LDL"
            name="LDL"
            label="LDL Cholesterol"
            value={formData.LDL}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            type="number"
            id="triglycerides"
            name="triglycerides"
            label="Triglycerides"
            value={formData.triglycerides}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            type="number"
            id="totalCholesterolHDLRatio"
            name="totalCholesterolHDLRatio"
            label="Total Cholesterol/HDL Ratio"
            value={formData.totalCholesterolHDLRatio}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            type="number"
            id="triglyceridesHDLRatio"
            name="triglyceridesHDLRatio"
            label="Triglyceride to HDL Ratio"
            value={formData.triglyceridesHDLRatio}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            type="number"
            id="HDLLDLRatio"
            name="HDLLDLRatio"
            label="HDL to LDL Ratio"
            value={formData.HDLLDLRatio}
            onChange={handleInputChange}
            fullWidth
          />
        </div>
      )}
      <FormControl fullWidth>
        <Typography>Status</Typography>
        <Select
          labelId="statusOfReport-label"
          id="statusOfReport"
          name="statusOfReport"
          value={formData.statusOfReport}
          onChange={handleStatusChange}
        >
          <MenuItem value="Normal">Normal</MenuItem>
          <MenuItem value="Abnormal">Abnormal</MenuItem>
          <MenuItem value="Borderline">Borderline</MenuItem>
        </Select>
      </FormControl>
      <div className="button-container">
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </div>
    </form>
  );
      };
export default ReportForm;
   
