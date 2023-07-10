import React, { useRef } from 'react';
import { AppBar, Toolbar, Typography, Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, LinearProgress, IconButton, Button, Divider } from '@mui/material';
import './smartReport.css';
import TableRowComponent from './ReportRow';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutUserMutation } from '../../api';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../userReducer';
import Swal from 'sweetalert2';
import HomeIcon from '@mui/icons-material/Home';
import html2pdf from 'html2pdf.js';

const LabTestReport = () => {
  const componentRef = useRef(null);
  
  const user = useSelector((state) => state?.user?.loggedInUserData);
  const reportData = useSelector((state) => state?.user?.reportData);

  
  const [logoutUser] = useLogoutUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res =  await logoutUser();
      dispatch(userActions.setLoggedInUserData(null));
      Swal.fire({
        icon: "success",
        text: "Logged Out Successfully",
        showConfirmButton: false,
        timer: 2000
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message,
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  const downloadPdf = () => {
    const options = {
      filename: 'lab_test_report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().set(options).from(componentRef.current).save();
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Stack
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
            sx={{ width: '100%' }} 
          >
            <Typography variant="h6" sx={{ alignSelf: 'flex-start' }}>{"Lab Test Report " + user?.username}</Typography>
            <Stack
              style={{ flexDirection: "row" }}
              sx={{ alignSelf: 'flex-end' }} 
            >
              <IconButton>
                <HomeIcon style={{ fill: "white" }} onClick={() => { navigate("/") }} />
              </IconButton>
              <Button color="inherit" onClick={() => { logout() }}>Logout</Button>
              <Button color="inherit" onClick={() => { downloadPdf() }}>Download PDF</Button>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container ref={componentRef}>
        <div className="aboutSection">
        <Divider />
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack alignItems={"flex-start"}>
            <Typography fontWeight={"600"}>Name</Typography>
            <Typography>{user?.username}</Typography>
          </Stack>
          <Stack direction={"row"} gap={4}>
          <Stack >
            <Typography fontWeight={"600"}>Accession Number</Typography>
            <Typography>{reportData?.testResults?.accessionNumber}</Typography>
          </Stack>
          <Stack alignItems={"flex-start"}>
            <Typography fontWeight={"600"}>Age</Typography>
            <Typography>{reportData?.testResults?.age + " yrs"}</Typography>
          </Stack>
          <Stack >
            <Typography fontWeight={"600"} >Date of Test</Typography>
            <Typography>{reportData?.dateOfTest}</Typography>
          </Stack>
          </Stack>
        </Stack>
        <Divider />
          <Typography style={{textAlign: "start", marginTop: "10px"}} variant="h5">{reportData?.testType}</Typography>
          
          {reportData?.testType === "Cancer Screening Test" ? 
          <Typography style={{textAlign: "start"}} variant="body1">
            Cancer screening refers to tests or exams conducted to detect cancer at an early stage, even before symptoms appear. It aims to identify abnormal cells or tumors before they spread and become more difficult to treat. Regular screening can improve chances of successful treatment and survival through early intervention.
          </Typography>
          :
          <Typography style={{textAlign: "start"}} variant="body1">
            A lipid profile test is a blood test that measures various types of fats (lipids) in the bloodstream. It provides information about cholesterol levels, including low-density lipoprotein (LDL) cholesterol, high-density lipoprotein (HDL) cholesterol, and triglycerides. The results help assess the risk of cardiovascular diseases and guide preventive measures and treatments.
          </Typography>
          }
        </div>
        <Stack justifyContent={"flex-end"} alignItems="flex-end">
        <div style={{width:"36.5%"}} className="tableContainer">
          <TableContainer component={Paper} style={{overflow: "hidden"}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>BorderLine</TableCell>
                  <TableCell>Normal</TableCell>
                  <TableCell>Abnormal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="progressBar low" />
                  </TableCell>
                  <TableCell>
                    <div className="progressBar normal" />
                  </TableCell>
                  <TableCell>
                    <div className="progressBar high" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
        <div style={{width:"49.5%"}} className="tableContainer">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Test Name</TableCell>
                  <TableCell>Result</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>

        <div className="tableContainer" style={{width:"49.5%"}}>
          <TableContainer style={{overflow: "hidden"}} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Range</TableCell>
                  <TableCell>Low</TableCell>
                  <TableCell>Normal</TableCell>
                  <TableCell>High</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>
        </Stack>
        

        {Object.keys(reportData?.testResults || {}).map((key) => {
  const value = reportData.testResults[key];
  return key !== "age" && key !== "accessionNumber" && (<TableRowComponent key={key} value={value} name={key} testType={reportData?.testType} />) ;
})}
        

        <div className="riskFactors">
          <Typography style={{textAlign: "start"}} variant="h5">Risk Factors</Typography>
          {reportData?.testType === "Cancer Screening Test" ? 
          <>
          <Typography style={{textAlign: "start"}} variant="body1">
            - Don't smoke or use tobacco products.
            </Typography>
          <Typography style={{textAlign: "start"}} variant="body1">
          - Eat a healthy diet rich in fruits, vegetables, and whole grains.
         </Typography>
        <Typography style={{textAlign: "start"}} variant="body1">
        - Engage in regular physical activity and maintain a healthy weight.
      </Typography>
      </>

          :
          <>
          <Typography style={{textAlign: "start"}} variant="body1">
            - Follow a balanced diet low in saturated fats and cholesterol.
            </Typography>
          <Typography style={{textAlign: "start"}} variant="body1">
          - Engage in regular exercise to maintain a healthy lipid profile
         </Typography>
        <Typography style={{textAlign: "start"}} variant="body1">
        - Limit or avoid excessive alcohol consumption for a healthy lipid profile.
      </Typography>
          </>
          }
        </div>
      </Container>
    </div>
  );
};

export default LabTestReport;
