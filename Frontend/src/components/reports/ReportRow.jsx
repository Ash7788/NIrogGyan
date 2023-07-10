import React from "react";
import { Stack, TableContainer, Paper, Table, TableRow, TableCell, TableBody, LinearProgress } from "@mui/material";
import './smartReport.css';
import { cancerMarkerRange, colour, lipidRange } from "../../helpers/rangeCalculator";

const TableRowComponent = ({name, value, testType}) => {


  function PNC(){
  if(testType === "Cancer Screening Test"){
    return cancerMarkerRange(name,value)
  }else{
    return lipidRange(name,value)
  }
  }

  return (
    <Stack direction="column" justifyContent="space-between">
      <Stack  direction="row" justifyContent="space-between">
        <div style={{ width: "49.5%" }} className="tableContainer">
          <TableContainer style={{background: colour(PNC()?.range)}} component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell width={"60%"} >{name}</TableCell>
                  <TableCell width={"40%"} >{value}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className="tableContainer" style={{ width: "49.5%" }}>
          <TableContainer style={{ overflow: "hidden" }} component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell style={{ height: "20px", textAlign: "-webkit-right" }}>
                    <LinearProgress style={{ width: "75%", background: colour(PNC()?.range) }} color={"inherit"} variant="determinate" value={PNC().percentage} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Stack>
    </Stack>
  );
};

export default TableRowComponent;
