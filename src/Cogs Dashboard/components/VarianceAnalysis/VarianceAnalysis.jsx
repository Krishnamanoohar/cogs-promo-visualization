import React, { useState } from "react";
import SideMenu from "../SideMenuDrawer/SideMenu";
import AppTheme from "../../themes/shared-theme/AppTheme";
import { Box, Button, CssBaseline, Typography } from "@mui/material";
import { chartsCustomizations } from "../../themes/theme/customizations/charts.jsx";
import { dataGridCustomizations } from "../../themes/theme/customizations/dataGrid";
import { treeViewCustomizations } from "../../themes/theme/customizations/treeView.jsx";
import { DataGrid } from "@mui/x-data-grid";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { TitleContainer } from "../OpportunityPage/OpportunityPage.jsx";

const VarianceAnalysis = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...treeViewCustomizations,
  };

  const rowData = [
    {
      id: "68107241a017fcb3809e151c",
      category: "Qty (Cases)",
      actual: 100,
      planned: 120,
      difference: "£20",
    },
    {
      id: "68107241a017fcb3809e151d",
      category: "COGS (GBP)",
      actual: 90,
      planned: 95,
      difference: "£5",
    },
  ];

  const columnData = [
    {
      field: "category",
      headerName: "Category",
      width: 200,
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "actual",
      headerName: "Actual",
      width: 150,
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "planned",
      headerName: "Planned",
      width: 150,
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "difference",
      headerName: "Difference",
      width: 150,
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => (
        <strong
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {params.value} <ArrowDropDownIcon />
        </strong>
      ),
    },
  ];

  const detailColumnData = [
    {
      field: "metric",
      headerName: "Metric",
      width: 200,
      flex: 1,
      // align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "value",
      headerName: "Value",
      width: 200,
      flex: 1,
      // align: "center",
      headerAlign: "center",
      sortable: false,
    },
  ];

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
  };

  const generateDetails = (row) => {
    if (!row) return [];

    return [
      { id: 1, metric: "Category", value: row.category },
      { id: 2, metric: "Actual", value: row.actual },
      { id: 3, metric: "Planned", value: row.planned },
      { id: 4, metric: "Difference", value: row.difference },
      { id: 5, metric: "Game", value: "Tetris 🎮" }, // Example game string
    ];
  };

  const handleCellClick = (params, event) => {
    if (params.field === "difference") {
      setSelectedRow(params.row);
    }
  };

  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TitleContainer
            variant="h3"
            sx={{
              p: 1,
              m: 2,
              fontWeight: 600,
              fontFamily: "Poppins, sans-serif",
              textTransform: "uppercase",
              letterSpacing: "1px",
              width: "97%",
              fontSize: "28px",
            }}
          >
            Variance Analysis
          </TitleContainer>

          {/* Left Side DataGrid */}
          <Box
            sx={{
              maxWidth: "98%",
              width: "100%",
              height: "40vh",
              // m: 1,
              p: 1,
              flex: 1,
            }}
          >
            <DataGrid
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              disableColumnMenu
              columns={columnData}
              rows={rowData}
              onCellClick={handleCellClick}
              sx={{
                height: "100%",
                "& .MuiDataGrid-cell:focus": {
                  outline: "none",
                },
                "& .MuiDataGrid-cell": {
                  fontWeight: "600",
                  cursor: "pointer",
                  // backgroundColor: "#d9d9d9",
                  borderBottom: "1px solid black",
                  // borderRadius: "5px",
                },
                "& .MuiDataGrid-columnHeader": {
                  fontSize: "18px",
                  backgroundColor: "#021c51",
                  color: "white",
                  cursor: "pointer",
                },
                "& .MuiDataGrid-menuIconButton": {
                  color: "white",
                },
                "& .MuiDataGrid-filler": {
                  // display: "#d9d9d9",
                },
                "& .css-1tdeh38": {
                  borderTop: "none",
                  // background: "#d9d9d9",
                },
                "& .MuiDataGrid-columnHeaders": {
                  fontSize: "16px", // Set your desired font size here
                },
              }}
            />
          </Box>
          {/* Right Side Conditional DataGrid */}
          {selectedRow && (
            <Box
              sx={{
                maxWidth: "98%",
                width: "100%",
                m: 1,
                p: 1,
                flex: 1,
              }}
            >
              <Box display={"flex"} justifyContent={"center"}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontSize: "24px",
                    fontFamily: "Poppins, sans-serif",
                    textAlign: "center",
                    width: "min-content",
                    textWrap: "nowrap",
                    borderBottom: "2px solid",
                  }}
                >
                  Details for {selectedRow.category}
                </Typography>
              </Box>
              <DataGrid
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                disableColumnMenu
                columns={detailColumnData}
                rows={generateDetails(selectedRow)}
                hideFooter
                sx={{
                  height: "100%",
                  "& .MuiDataGrid-cell:focus": {
                    outline: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    fontWeight: "600",
                    cursor: "pointer",
                    textAlign: "left",
                    paddingLeft: "23%",
                    // backgroundColor: "#d9d9d9",
                    borderBottom: "0.5px solid black",
                    // borderRadius: "5px",
                  },
                  "& .MuiDataGrid-columnHeader": {
                    fontSize: "18px",
                    backgroundColor: "#021c51",
                    color: "white",
                  },
                  "& .css-1tdeh38": {
                    borderTop: "none",
                    // background: "#d9d9d9",
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </AppTheme>
  );
};

export default VarianceAnalysis;
