import React, { useEffect, useState } from 'react';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import './homepage.css';
import ReportForm from '../forms/reportForm';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import ReportEditForm from '../forms/reportEditForm';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutUserMutation } from '../../api';
import { userActions } from '../../userReducer';
import { colour } from '../../helpers/rangeCalculator';


const HomePage = () => {
    
  const [open, setOpen] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [reportId, setReportId] = useState("");
  const [logoutUser] = useLogoutUserMutation();

  const dispatch = useDispatch();
  
  

  

  const userData = useSelector((state) => state.user.loggedInUserData);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditFormClose = () => {
    setOpenEditForm(false);
  };
  const handleEditFormOpen = () => {
    setOpenEditForm(true);
  };

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

    }catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message,
        showConfirmButton: false,
        timer: 2000
      });
    }
  }
    
  const deleteReport = (reportId) => {
    axios
      .delete(`http://localhost:5001/report/${reportId}`)
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: "Report Deleted Successfully",
          showConfirmButton: false,
          timer: 2000
        });
         navigate("/login");
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
  const [allReports, setAllReports] = useState(null);

  useEffect(() => {
    if (!userData?._id) {
      return;
    }
  
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5001/report/user/' + userData._id);
        const allReportsData = res.data;
        setAllReports(allReportsData);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [userData]);


console.log(colour("Abnormal"))
   

  return (
    <div className="root">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" className="title">
          {`Welcome Back! ${ userData?.username}` }
          </Typography>
          <IconButton>
          <HomeIcon style={{fill: "white"}} onClick={()=>{navigate("/")}} />
          </IconButton>
          <Button  color="inherit" onClick={()=>{logout()}} >Logout</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="container">
        <Typography variant="h6" className="heading">
          Your Test Results History
        </Typography>

        <TableContainer  className="tableContainer">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Test Type</TableCell>
                <TableCell>Result</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allReports?.reports?.map((result)=>{return(<>
                <TableRow style={{background: colour(result?.statusOfReport) }} >
                <TableCell style={{cursor: "pointer"}} onClick={()=>{ dispatch(userActions.setReportData(result)); navigate("/report")}}>{result?.dateOfTest}</TableCell>
                <TableCell style={{cursor: "pointer"}} onClick={()=>{ dispatch(userActions.setReportData(result)); navigate("/report")}}>{result?.testType}</TableCell>
                <TableCell style={{cursor: "pointer"}} onClick={()=>{ dispatch(userActions.setReportData(result)); navigate("/report")}}>{result?.statusOfReport}</TableCell>
                <TableCell>
                  <IconButton><ModeIcon onClick={()=>{setReportId(result?._id); handleEditFormOpen()}} /></IconButton>
                  <IconButton><DeleteIcon  onClick={()=>{deleteReport(result?._id)}} /></IconButton>
                </TableCell>
              </TableRow>
              </>)
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          style={{marginTop : "20px"}}
          variant="contained"
          color="primary"
          onClick={handleOpen}
          className="addButton"
        >
          Add New Test Result
        </Button>
        
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Test Result</DialogTitle>
          <DialogContent className="dialogContent">
            <ReportForm user={userData} setOpen={setOpen} />
          </DialogContent>
        </Dialog>
        <Dialog open={openEditForm} onClose={handleEditFormClose}>
          <DialogTitle>Edit Test Result</DialogTitle>
          <DialogContent className="dialogContent">
            <ReportEditForm reportId={reportId} user={userData} setOpen={setOpenEditForm} />
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
};

export default HomePage;
