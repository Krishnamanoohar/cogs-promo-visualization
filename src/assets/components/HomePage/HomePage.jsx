//  import { Box, Breadcrumbs, Link, Paper, Typography } from "@mui/material";
//  import React from "react";
//  import MiniDrawer from "../Drawer/Drawer";
//  import NavigateNextIcon from "@mui/icons-material/NavigateNext";

//  const HomePage = () => {
//    const crumbs = ["Home", "Catalog", "Accessories", "New Collection"];
//    return (
//      <Box>
//        <MiniDrawer />
//        <Paper elevation={1} sx={{ padding: "1rem", marginLeft: "4rem" }}>
//          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
//            {crumbs.map((item, index) => (
//              <Link underline="hover" color="inherit" href="#">
//                {item}
//              </Link>
//            ))}
//          </Breadcrumbs>
//        </Paper>
//      </Box>
//    );
//  };

//  export default HomePage;

import React, { useState } from "react";
import {
  Box,
  Breadcrumbs,
  Link,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MiniDrawer from "../Drawer/Drawer";
import AGGridWithBreadcrumbs from "../Tables/AgGridTable/AgGridWithBreadCrumbs";
import AppNavbar from "../MUI Dashboard/dashboard-mui/components/AppNavbar";

//  Sample nested data
const data1 = {
  Home: [
    { name: "Catalog", type: "folder" },
    { name: "Dashboard", type: "file" },
  ],
  Catalog: [
    { name: "Accessories", type: "folder" },
    { name: "Clothing", type: "folder" },
  ],
  Accessories: [
    { name: "New Collection", type: "folder" },
    { name: "Classic Line", type: "folder" },
  ],
  "New Collection": [
    { name: "Product A", type: "file" },
    { name: "Product B", type: "file" },
  ],
};

const data2 = {
  Home: [
    { name: "Catalog", type: "folder" },
    { name: "Dashboard", type: "file" },
    { name: "Orders", type: "folder" },
    { name: "Customers", type: "folder" },
    { name: "Reports", type: "folder" },
  ],
  Catalog: Array.from({ length: 20 }, (_, i) => ({
    name: `Category ${i + 1}`,
    type: "folder",
    size: "-",
    modified: `2025-04-${(i % 30) + 1}`,
    status: "Active",
  })),
  ...Object.fromEntries(
    Array.from({ length: 20 }, (_, i) => [
      `Category ${i + 1}`,
      Array.from({ length: 10 }, (_, j) => ({
        name: `Item ${i + 1}.${j + 1}`,
        type: j % 2 === 0 ? "folder" : "file",
      })),
    ])
  ),
  Orders: [
    { name: "Pending", type: "folder" },
    { name: "Completed", type: "folder" },
    { name: "Refunded", type: "file" },
  ],
  Pending: Array.from({ length: 15 }, (_, i) => ({
    name: `Order #${1000 + i}`,
    type: "file",
  })),
  Completed: Array.from({ length: 10 }, (_, i) => ({
    name: `Completed Order #${2000 + i}`,
    type: "file",
  })),
  Customers: Array.from({ length: 30 }, (_, i) => ({
    name: `Customer ${i + 1}`,
    type: "folder",
  })),
  ...Object.fromEntries(
    Array.from({ length: 30 }, (_, i) => [
      `Customer ${i + 1}`,
      Array.from({ length: 5 }, (_, j) => ({
        name: `Invoice ${i + 1}-${j + 1}`,
        type: "file",
      })),
    ])
  ),
  Reports: [
    { name: "Monthly", type: "folder" },
    { name: "Quarterly", type: "folder" },
    { name: "Yearly", type: "folder" },
  ],
  Monthly: Array.from({ length: 12 }, (_, i) => ({
    name: `Report - Month ${i + 1}`,
    type: "file",
  })),
  Quarterly: ["Q1", "Q2", "Q3", "Q4"].map((q) => ({
    name: `${q} Report`,
    type: "file",
  })),
  Yearly: [
    { name: "2022 Report", type: "file" },
    { name: "2023 Report", type: "file" },
    { name: "2024 Forecast", type: "file" },
  ],
};

const data = {
  Home: [
    {
      name: "Catalog",
      type: "folder",
      size: "-",
      modified: "2025-04-01",
      status: "Active",
    },
    {
      name: "Dashboard",
      type: "file",
      size: "1.2 MB",
      modified: "2025-04-05",
      status: "Published",
    },
    {
      name: "Orders",
      type: "folder",
      size: "-",
      modified: "2025-03-28",
      status: "Archived",
    },
    {
      name: "Customers",
      type: "folder",
      size: "-",
      modified: "2025-04-03",
      status: "Active",
    },
    {
      name: "Reports",
      type: "folder",
      size: "-",
      modified: "2025-04-06",
      status: "Active",
    },
  ],

  Catalog: Array.from({ length: 20 }, (_, i) => ({
    name: `Category ${i + 1}`,
    type: "folder",
    size: "-",
    modified: `2025-04-${(i % 30) + 1}`,
    status: "Active",
  })),

  ...Object.fromEntries(
    Array.from({ length: 20 }, (_, i) => [
      `Category ${i + 1}`,
      Array.from({ length: 10 }, (_, j) => ({
        name: `Item ${i + 1}.${j + 1}`,
        type: j % 2 === 0 ? "folder" : "file",
        size: j % 2 === 0 ? "-" : `${(Math.random() * 5 + 1).toFixed(2)} MB`,
        modified: `2025-03-${(j % 28) + 1}`,
        status: j % 3 === 0 ? "Archived" : "Published",
      })),
    ])
  ),

  Orders: [
    {
      name: "Pending",
      type: "folder",
      size: "-",
      modified: "2025-03-15",
      status: "Pending",
    },
    {
      name: "Completed",
      type: "folder",
      size: "-",
      modified: "2025-03-18",
      status: "Completed",
    },
    {
      name: "Refunded",
      type: "file",
      size: "850 KB",
      modified: "2025-03-10",
      status: "Closed",
    },
  ],

  Pending: Array.from({ length: 15 }, (_, i) => ({
    name: `Order #${1000 + i}`,
    type: "file",
    size: `${(Math.random() * 2 + 0.5).toFixed(2)} MB`,
    modified: `2025-04-${(i % 28) + 1}`,
    status: "Pending",
  })),

  Completed: Array.from({ length: 10 }, (_, i) => ({
    name: `Completed Order #${2000 + i}`,
    type: "file",
    size: `${(Math.random() * 3 + 1).toFixed(2)} MB`,
    modified: `2025-03-${(i % 28) + 1}`,
    status: "Completed",
  })),

  Customers: Array.from({ length: 30 }, (_, i) => ({
    name: `Customer ${i + 1}`,
    type: "folder",
    size: "-",
    modified: `2025-03-${(i % 28) + 1}`,
    status: "Active",
  })),

  ...Object.fromEntries(
    Array.from({ length: 30 }, (_, i) => [
      `Customer ${i + 1}`,
      Array.from({ length: 5 }, (_, j) => ({
        name: `Invoice ${i + 1}-${j + 1}`,
        type: "file",
        size: `${(Math.random() * 1.5 + 0.3).toFixed(2)} MB`,
        modified: `2025-02-${(j % 28) + 1}`,
        status: j % 2 === 0 ? "Paid" : "Unpaid",
      })),
    ])
  ),

  Reports: [
    {
      name: "Monthly",
      type: "folder",
      size: "-",
      modified: "2025-04-01",
      status: "Archived",
    },
    {
      name: "Quarterly",
      type: "folder",
      size: "-",
      modified: "2025-04-01",
      status: "Active",
    },
    {
      name: "Yearly",
      type: "folder",
      size: "-",
      modified: "2025-04-01",
      status: "Active",
    },
  ],

  Monthly: Array.from({ length: 12 }, (_, i) => ({
    name: `Report - Month ${i + 1}`,
    type: "file",
    size: `${(Math.random() * 2 + 1).toFixed(2)} MB`,
    modified: `2025-${String(i + 1).padStart(2, "0")}-01`,
    status: "Archived",
  })),

  Quarterly: ["Q1", "Q2", "Q3", "Q4"].map((q, i) => ({
    name: `${q} Report`,
    type: "file",
    size: `${(Math.random() * 4 + 2).toFixed(2)} MB`,
    modified: `2025-0${i * 3 + 1}-01`,
    status: "Published",
  })),

  Yearly: [
    {
      name: "2022 Report",
      type: "file",
      size: "4.5 MB",
      modified: "2023-01-01",
      status: "Archived",
    },
    {
      name: "2023 Report",
      type: "file",
      size: "4.9 MB",
      modified: "2024-01-01",
      status: "Archived",
    },
    {
      name: "2024 Forecast",
      type: "file",
      size: "3.8 MB",
      modified: "2025-01-01",
      status: "Draft",
    },
  ],
};

const HomePage = () => {
  const [breadcrumbs, setBreadcrumbs] = useState(["Home"]);

  //  Get current level's table data
  const currentPath = breadcrumbs[breadcrumbs.length - 1];
  const tableData = data[currentPath] || [];

  const handleRowClick = (row) => {
    if (row.type === "folder") {
      setBreadcrumbs((prev) => [...prev, row.name]);
    }
  };

  const handleBreadcrumbClick = (index) => {
    setBreadcrumbs((prev) => prev.slice(0, index + 1));
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#f1efec" }}>
        <MiniDrawer />
        <AppNavbar />
        <Box
          sx={{
            marginLeft: "4.5rem",
            width: "93%",
            backgroundColor: "#F1EFEC",
            minHeight: "100vh",
          }}
        >
          <Paper elevation={4} sx={{ padding: "1rem", marginTop: "0.5rem" }}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              {breadcrumbs.map((item, index) => (
                <Link
                  key={index}
                  underline="hover"
                  color="inherit"
                  href="#"
                  onClick={() => handleBreadcrumbClick(index)}
                >
                  {item}
                </Link>
              ))}
            </Breadcrumbs>
          </Paper>
          <Paper elevation={4}>
            <TableContainer sx={{ marginTop: 2 }}>
              <Table sx={{ borderRadius: "5px" }}>
                <TableHead sx={{ backgroundColor: "#123458" }}>
                  <TableRow sx={{ color: "white" }}>
                    <TableCell sx={{ color: "white" }}>Name</TableCell>
                    <TableCell sx={{ color: "white" }}>Type</TableCell>
                    <TableCell sx={{ color: "white" }}>Size</TableCell>
                    <TableCell sx={{ color: "white" }}>Date Modified</TableCell>
                    <TableCell sx={{ color: "white" }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableHead sx={{ backgroundColor: "#123458" }}>
                  <TableRow sx={{ color: "white" }}>
                    <TableCell sx={{ color: "white" }}>Name</TableCell>
                    <TableCell sx={{ color: "white" }}>Type</TableCell>
                    <TableCell sx={{ color: "white" }}>Size</TableCell>
                    <TableCell sx={{ color: "white" }}>Date Modified</TableCell>
                    <TableCell sx={{ color: "white" }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow
                      key={index}
                      hover
                      sx={{
                        cursor: row.type === "folder" ? "pointer" : "default",
                      }}
                      onClick={() => handleRowClick(row)}
                    >
                      <TableCell
                        sx={{
                          textDecoration:
                            row.type === "folder" ? "underline" : "default",
                        }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.size || "-"}</TableCell>
                      <TableCell>{row.modified || "-"}</TableCell>
                      <TableCell>{row.status || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
      <AGGridWithBreadcrumbs />
    </>
  );
};

export default HomePage;
