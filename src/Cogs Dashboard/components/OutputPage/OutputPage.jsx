// GanttEchartsWithTable.jsx
import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import {
  Box,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AppTheme from "../../themes/shared-theme/AppTheme";
import { chartsCustomizations } from "../../themes/theme/customizations/charts.jsx";
import { dataGridCustomizations } from "../../themes/theme/customizations/dataGrid";
import { treeViewCustomizations } from "../../themes/theme/customizations/treeView.jsx";
import { DataGrid } from "@mui/x-data-grid";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SideMenu from "../SideMenuDrawer/SideMenu";
import GraphTitle from "../../utils/GraphTitle";
import { color } from "echarts";

const GanttEchartsWithTable = () => {
  const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...treeViewCustomizations,
  };

  // Gantt-style data
  const ganttData = [
    { task: "Design", start: "2024-05-01", end: "2024-05-05" },
    { task: "Development", start: "2024-05-06", end: "2024-05-15" },
    { task: "Testing", start: "2024-05-16", end: "2024-05-20" },
    { task: "Deployment", start: "2024-05-21", end: "2024-05-23" },
  ];

  // Convert to timestamp range for ECharts
  const seriesData = ganttData.map((item, index) => ({
    name: item.task,
    value: [
      index,
      new Date(item.start).getTime(),
      new Date(item.end).getTime(),
    ],
    itemStyle: {
      color: "#1976d2",
    },
  }));

  // MUI DataGrid setup
  const rows = ganttData.map((item, i) => ({
    id: i,
    ...item,
  }));

  const columns = [
    { field: "task", headerName: "Task", flex: 1 },
    { field: "start", headerName: "Start Date", flex: 1 },
    { field: "end", headerName: "End Date", flex: 1 },
  ];

  const months = [
    "Mar",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const tableRows = [
    {
      label: "Market = INDIA",
      source: "P",
      data: [
        "P9",
        "P1",
        "P2",
        "P3",
        "P4",
        "P5",
        "P6",
        "P7",
        "P8",
        "P9",
        "P10",
        "P11",
        "P12",
        "P1",
        "P2",
        "P3",
        "P4",
        "P5",
        "P6",
      ],
    },
    {
      label: "Gate 5 Campaign Activation Dates",
      source: "Initiator",
      data: [null, null, null, null, "G5 Activation Period", "Inventory Aging"],
    },
    {
      label: "SKU Creation Date (SAP)",
      source: "I&BC",
      data: [],
    },
    {
      label: "Production (Qty in Cases)",
      source: "Supply",
      data: [22875, 74537, 78592, 24000],
    },
    {
      label: "Orders from DBBV to Supply",
      source: "DBBV",
      data: [47700, 49712, 78592, 24000],
    },
    {
      label: "Orders from Market to DBBV (Qty in Cases)",
      source: "Market",
      data: [176000, 21440, 2560],
    },
    {
      label: "Order Shipment DBBV to Market (Qty in Cases)",
      source: "DBBV",
      data: [71872, 80640, 47488],
    },
    {
      label: "Delivery in Mkt (Qty in Cases)",
      source: "Market",
      data: [24832, 47040, 125568, 2560],
    },
    {
      label: "Depletion in Mkt (Qty in Cases)",
      source: "Market",
      data: [
        3300,
        50130,
        58900,
        29937,
        40778,
        12446,
        3824,
        null,
        null,
        100,
        null,
        null,
        null,
        15,
      ],
    },
    {
      label: "Inventory On Hand in Mkt (Qty in Cases)",
      source: "Market",
      data: [570],
    },
  ];

  // Convert tableRows into Gantt-style data
  const parseMonth = (monthStr, yearOffset = 0) => {
    const baseYear = 2024;
    const monthMap = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };
    return new Date(baseYear + yearOffset, monthMap[monthStr], 1);
  };

  const expandedGanttData = [];

  tableRows.forEach((row, rowIndex) => {
    row.data.forEach((val, i) => {
      if (val !== null && val !== undefined && val !== "") {
        // Some months like Jan/Feb appear twice; we assume yearOffset=0 for first round, 1 for second
        const yearOffset = i >= 12 ? 1 : 0;
        const monthLabel = months[i];
        const start = parseMonth(monthLabel, yearOffset);
        const end = new Date(start);
        end.setDate(end.getDate() + 3); // Assume a 3-day span for visualization

        expandedGanttData.push({
          name: row.label,
          value: [row.label, start.getTime(), end.getTime()],
          itemStyle: { color: `hsl(${(rowIndex * 50) % 360}, 60%, 60%)` },
        });
      }
    });
  });

  // const ganttOption = {
  //   tooltip: {
  //     formatter: (params) => {
  //       const start = new Date(params.value[1]).toLocaleDateString();
  //       const end = new Date(params.value[2]).toLocaleDateString();
  //       return `<strong>${params.name}</strong><br/>Start: ${start}<br/>End: ${end}`;
  //     },
  //   },
  //   title: {
  //     left: "center",
  //   },
  //   grid: {
  //     containLabel: true,
  //     left: "5%",
  //   },
  //   xAxis: {
  //     type: "time",
  //     name: "Date",
  //     nameLocation: "middle",
  //     nameGap: 30,
  //     axisLabel: {
  //       color: "#000000",
  //     },
  //   },
  //   yAxis: {
  //     type: "category",
  //     data: [...new Set(expandedGanttData.map((d) => d.name))], // unique task names
  //     axisLabel: {
  //       color: "#000000",
  //     },
  //   },
  //   series: [
  //     {
  //       type: "custom",
  //       renderItem: function (params, api) {
  //         const categoryIndex = api.value(0);
  //         const start = api.coord([api.value(1), categoryIndex]);
  //         const end = api.coord([api.value(2), categoryIndex]);
  //         const height = 20;

  //         return {
  //           type: "rect",
  //           shape: {
  //             x: start[0],
  //             y: start[1] - height / 2,
  //             width: end[0] - start[0],
  //             height: height,
  //           },
  //           style: api.style(),
  //         };
  //       },
  //       encode: {
  //         x: [1, 2],
  //         y: 0,
  //       },
  //       data: expandedGanttData,
  //     },
  //   ],
  // };

  const getDateRangeForMonth = (monthLabel, index) => {
    const monthMap = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };
    const baseYear = 2024;
    const year = index < 12 ? baseYear : baseYear + 1;
    const month = monthMap[monthLabel];
    const start = new Date(year, month, 1);
    const end = new Date(year, month, 7); // each task spans 7 days
    return [start.getTime(), end.getTime()];
  };

  const periodMap = {
    P1: 1,
    P2: 2,
    P3: 3,
    P4: 4,
    P5: 5,
    P6: 6,
    P7: 7,
    P8: 8,
    P9: 9,
    P10: 10,
    P11: 11,
    P12: 12,
  };

  const ganttTasks = [
    {
      name: "SKU Production (DSL)",
      value: [0, periodMap.P1, periodMap.P4],
    },
    {
      name: "Market Orders",
      value: [1, periodMap.P1, periodMap.P3],
    },
    {
      name: "DBBV shipments to Mkt",
      value: [2, periodMap.P3, periodMap.P6],
    },
    {
      name: "Activation Period (G5)",
      value: [3, periodMap.P4, periodMap.P6],
    },
  ];

  const dataMap = {
    India: [
      { name: "SKU Production (DSL)", value: [0, 1, 4] },
      { name: "Market Orders", value: [1, 1, 3] },
      { name: "DBBV shipments to Mkt", value: [2, 3, 6] },
      { name: "Activation Period (G5)", value: [3, 4, 6] },
    ],
    Brazil: [
      { name: "SKU Production (DSL)", value: [0, 2, 5] },
      { name: "Market Orders", value: [1, 1, 2] },
      { name: "DBBV shipments to Mkt", value: [2, 1, 5] },
      { name: "Activation Period (G5)", value: [3, 5, 6] },
    ],
  };

  const [countryData, setCountryData] = useState("India");
  const [ganttDataState, setGanttDataState] = useState(dataMap["India"]);

  const handleChange = (event) => {
    const selected = event.target.value;
    setCountryData(selected);
    setGanttDataState(dataMap[selected]);
  };

  // tableRows.forEach((row, rowIndex) => {
  //   row.data.forEach((value, i) => {
  //     if (value !== null && value !== undefined && value !== "") {
  //       const [start, end] = getDateRangeForMonth(months[i], i);
  //       ganttTasks.push({
  //         name: row.label,
  //         value: [row.label, start, end],
  //         itemStyle: {
  //           color: `hsl(${(rowIndex * 40) % 360}, 70%, 60%)`,
  //         },
  //       });
  //     }
  //   });
  // });

  const ganttOption = {
    tooltip: {
      formatter: (params) => {
        const start = new Date(params.value[1]).toLocaleDateString();
        const end = new Date(params.value[2]).toLocaleDateString();
        return `<strong>${params.name}</strong><br/>Start: ${start}<br/>End: ${end}`;
      },
    },
    title: {
      text: "SKU Lifecycle Gantt Chart",
      left: "center",
    },
    grid: {
      left: "25%",
      right: "10%",
      top: 60,
      bottom: 50,
    },
    xAxis: {
      type: "value",
      name: "Timeline",
      min: 1,
      max: 12,
      interval: 1,
      axisLabel: {
        formatter: (val) => `P${val}`, // Display P1...P12
        color: "#000",
      },
    },
    yAxis: {
      type: "category",
      data: [
        "SKU Production (DSL)",
        "Market Orders",
        "DBBV shipments to Mkt",
        "Activation Period (G5)",
      ],
      axisLabel: {
        color: "#000",
        fontWeight: "bold",
      },
    },

    series: [
      {
        type: "custom",
        renderItem: (params, api) => {
          const categoryIndex = api.value(0);
          const start = api.coord([api.value(1), categoryIndex]);
          const end = api.coord([api.value(2), categoryIndex]);
          const height = 20;

          return {
            type: "rect",
            shape: {
              x: start[0],
              y: start[1] - height / 2,
              width: end[0] - start[0],
              height: height,
            },
            style: api.style(),
          };
        },
        encode: {
          x: [1, 2],
          y: 0,
        },
        data: ganttDataState,
      },
    ],
  };

  console.log(expandedGanttData);

  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <Box sx={{ width: "85.7%" }} p={3}>
          <Typography
            variant="h3"
            sx={{
              m: 1,
              fontWeight: 600,
              fontFamily: "Poppins, sans-serif",
              textTransform: "uppercase",
              letterSpacing: "1px",
              textAlign: "center",
            }}
          >
            Output
          </Typography>

          <FormControl
            sx={{
              width: "14rem",
              display: "flex",
              justifySelf: "right",
              margin: "1rem 0",
            }}
          >
            <InputLabel id="country-select-label">Country</InputLabel>
            <Select
              labelId="country-select-label"
              id="country-select"
              value={countryData}
              label="Country"
              onChange={handleChange}
            >
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="Brazil">Brazil</MenuItem>
            </Select>
          </FormControl>

          <Box boxShadow={4}>
            <GraphTitle title={"Project Timeline (Gantt Chart)"} />
            <ReactECharts option={ganttOption} style={{ height: 400 }} />
          </Box>

          <Typography
            variant="h6"
            mt={4}
            mb={1}
            sx={{
              fontSize: "24px",
              textAlign: "center",
              fontFamily: "Poppins, serif",
            }}
          >
            Task Details
          </Typography>
          <Box boxShadow={4} sx={{ borderRadius: "10px", p: 2 }}>
            <TableContainer>
              <Typography variant="h6" align="center" sx={{ py: 2 }}>
                SKU 768171 F21 Lifecycle Overview
              </Typography>
              <Table
                size="small"
                sx={{
                  // border: "1px solid #1e4e74",
                  background: "white",
                  padding: "10px",
                  mb: 3,
                }}
              >
                <TableHead sx={{ borderBottom: "1px solid #1e4e74" }}>
                  <TableRow sx={{ borderBottom: "1px solid #1e4e74" }}>
                    <TableCell
                      rowSpan={4}
                      sx={{
                        border: "1px solid #1e4e74",
                        borderLeft: "none",
                        background: "#edf7ff",
                        color: "#006bcc",
                        textAlign: "right",
                      }}
                    >
                      <strong>Activity</strong>
                    </TableCell>
                    <TableCell
                      rowSpan={2}
                      sx={{
                        border: "1px solid #1e4e74",
                        borderLeft: "none",
                        background: "#edf7ff",
                        color: "#006bcc",
                      }}
                    >
                      <strong>Owner</strong>
                    </TableCell>
                    <TableCell
                      colSpan={months.length}
                      align="center"
                      sx={{
                        borderBottom: "1px solid #1e4e74",
                        background: "#1e4e74",
                        color: "white",
                      }}
                    >
                      <strong>Month</strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {months.map((month, idx) => (
                      <TableCell
                        key={idx}
                        align="center"
                        sx={{ background: "#c7e6ff" }}
                      >
                        {month}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableRows.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell
                        sx={{
                          textWrap: "nowrap",
                          borderRight:
                            i >= 2 ? "3px solid #1e4e74" : "1px solid #1e4e74",
                          borderBottom:
                            i === 0
                              ? ""
                              : i === 1
                              ? "3px solid #1e4e74"
                              : "1px solid #1e4e74",
                          fontWeight: i === 0 ? 800 : 600,
                          fontFamily: "Poppins, sans-serif",
                          textAlign: "right",
                          background: "#edf7ff",
                          color: i === 0 ? "#006bcc" : "",
                        }}
                      >
                        {row.label}
                      </TableCell>
                      <TableCell
                        sx={{
                          textWrap: "nowrap",
                          borderRight:
                            i >= 2 ? "3px solid #1e4e74" : "1px solid #1e4e74",
                          borderBottom:
                            i === 0
                              ? ""
                              : i === 1
                              ? "3px solid #1e4e74"
                              : "1px solid #1e4e74",
                          fontWeight: i === 0 ? 800 : 600,
                          color: "#1e4e74",
                          textAlign: i === 0 ? "center" : "",
                          background: "#edf7ff",
                        }}
                      >
                        {row.source}
                      </TableCell>
                      {/* {months.map((_, idx) => (
                        <TableCell
                          key={idx}
                          colSpan={
                            i === 1 && idx === 4
                              ? 3
                              : i === 1 && idx === 5
                              ? 12
                              : 1
                          }
                          align="center"
                          sx={{
                            borderBottom:
                              i === 0
                                ? ""
                                : i === 1
                                ? "3px solid #1e4e74"
                                : "1px solid #1e4e74",
                            fontWeight: i === 0 ? 800 : 600,
                            backgroundColor:
                              i === 1 && idx === 4
                                ? "red"
                                : i === 1 && idx === 5
                                ? "black"
                                : "",
                            borderRadius: "0 25px 250px 0",
                          }}
                        >
                          {row.data[idx] ?? ""}
                        </TableCell>
                      ))} */}
                      {months.map((_, idx) => {
                        // For row index 1 only (Gate 5 row)
                        if (i === 1) {
                          if (idx < 4) {
                            return (
                              <TableCell
                                key={idx}
                                align="center"
                                sx={{
                                  borderBottom: "3px solid #1e4e74",
                                  fontWeight: 600,
                                }}
                              />
                            );
                          }
                          if (idx === 4) {
                            return (
                              <TableCell
                                key={idx}
                                colSpan={3}
                                align="center"
                                sx={{
                                  position: "relative",
                                  borderBottom: "3px solid #1e4e74",
                                  fontWeight: 600,
                                  backgroundColor: "#547792", // base cell color
                                  color: "white",
                                  padding: "10px 20px",
                                  overflow: "visible", // so the arrow tip can overflow
                                  "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    right: 0, // half the base width of the triangle
                                    width: 0,
                                    height: 0,
                                    borderTop: "0px solid transparent", // half cell height
                                    borderBottom: "20px solid transparent", // same as top
                                    // borderLeft: "20px solid red", // triangle color
                                    borderRight: "20px solid #213448", // triangle color
                                  },
                                  "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    bottom: 0,
                                    right: 0, // half the base width of the triangle
                                    width: 0,
                                    height: 0,
                                    borderTop: "20px solid transparent", // half cell height
                                    borderBottom: "0px solid transparent", // same as top
                                    borderLeft: "0px solid #213448", // triangle color
                                    borderRight: "20px solid #213448", // triangle color
                                  },
                                }}
                              >
                                {row.data[4] ?? ""}
                              </TableCell>
                            );
                          }
                          if (idx === 7) {
                            return (
                              <TableCell
                                key={idx}
                                colSpan={12}
                                align="center"
                                sx={{
                                  borderBottom: "3px solid #1e4e74",
                                  fontWeight: 600,
                                  backgroundColor: "#213448", // main color of the cell
                                  color: "white",
                                  padding: "10px 20px", // adjust spacing inside cell
                                  clipPath:
                                    "polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)",
                                  WebkitClipPath:
                                    "polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)",
                                }}
                              >
                                {row.data[5] ?? ""}
                              </TableCell>
                            );
                          }
                          // skip all other indexes
                          return null;
                        }

                        // default rendering for other rows
                        return (
                          <TableCell
                            key={idx}
                            align="center"
                            sx={{
                              borderBottom:
                                i === 0
                                  ? ""
                                  : i === 1
                                  ? "3px solid #1e4e74"
                                  : "1px solid #1e4e74",
                              fontWeight: i === 0 ? 800 : 600,
                              borderRadius: "0 25px 250px 0",
                            }}
                          >
                            {row.data[idx] ?? ""}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                autoPageSize
                disableRowSelectionOnClick
                sx={{
                  height: "100%",
                  "& .MuiDataGrid-cell:focus": {
                    outline: "none",
                  },
                  "& .MuiDataGrid-columnHeader": { cursor: "pointer" },
                  "& .MuiDataGrid-cell": {
                    fontWeight: "600",
                    cursor: "pointer",
                    backgroundColor: "#d9d9d9",
                    border: "1px solid black",
                    borderRadius: "5px",
                  },
                  "& .MuiDataGrid-columnHeader": {
                    backgroundColor: "#1e4e74",
                    color: "white",
                  },
                  "& .MuiDataGrid-menuIconButton": {
                    color: "white",
                  },
                  "& .MuiDataGrid-filler": {
                    display: "#d9d9d9",
                  },
                  "& .css-1tdeh38": {
                    borderTop: "none",
                    background: "#d9d9d9",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    fontSize: "16px", // Set your desired font size here
                  },
                }}
              /> */}
          </Box>
        </Box>
      </Box>
    </AppTheme>
  );
};

export default GanttEchartsWithTable;
