import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const rows = [
  {
    category: "Scotch",
    bau1: [1494, "38,368,129", "£2,222,458,596"],
    bau2: [673, "1,555,572", "£119,128,711"],
    bau3: [2167, "39,923,701", "£2,341,587,308"],
  },
  {
    category: "Europe Spirits",
    bau1: [979, "27,502,623", "£903,768,933"],
    bau2: [2, "291,169", "£19,799,894"],
    bau3: [1000, "27,793,792", "£923,568,827"],
  },
  {
    category: "Beer",
    bau1: [369, "7,337,073", "£0"],
    bau2: [4, "599,941", "£0"],
    bau3: [410, "7,937,014", "£0"],
  },
  {
    category: "Baileys",
    bau1: [201, "9,485,459", "£450,064,197"],
    bau2: [3, "635,415", "£34,662,947"],
    bau3: [237, "10,120,874", "£484,727,144"],
  },
  {
    category: "Tequila",
    bau1: [3, "76,152", "£18,030,003"],
    bau2: [2, "560", "£339,686"],
    bau3: [3, "76,712", "£18,369,689"],
  },
  {
    category: "F22 Grand Total",
    bau1: [3075, "9,561,612", "£468,094,200"],
    bau2: [773, "3,082,656", "£173,931,238"],
    bau3: [3848, "85,852,094", "£3,768,252,968"],
  },
];

const F22SummaryTable = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom>
        F22 Summary Data
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell rowSpan={2}>
                <b>Category</b>
              </TableCell>
              <TableCell align="center" colSpan={3}>
                <b>BAU 1</b>
              </TableCell>
              <TableCell align="center" colSpan={3}>
                <b>BAU 2</b>
              </TableCell>
              <TableCell align="center" colSpan={3}>
                <b>BAU 3</b>
              </TableCell>
            </TableRow>
            <TableRow>
              {["SKU Count", "Shipment (EU)", "Net Value (GBP)"]
                .flatMap((header) => Array(3).fill(header))
                .slice(0, 9)
                .map((header, index) => (
                  <TableCell key={index} align="center">
                    {header}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>
                  <b>{row.category}</b>
                </TableCell>
                {[...row.bau1, ...row.bau2, ...row.bau3].map((value, i) => (
                  <TableCell key={i} align="center">
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default F22SummaryTable;
