import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Dialog,
  Divider,
  Grid,
  Grow,
  IconButton,
  ListItemButton,
  ListItemText,
  Paper,
  Slide,
  Stack,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SideMenu from "../SideMenuDrawer/SideMenu";
import AppTheme from "../../themes/shared-theme/AppTheme";
import { chartsCustomizations } from "../../themes/theme/customizations/charts.jsx";
import { dataGridCustomizations } from "../../themes/theme/customizations/dataGrid.jsx";
import { treeViewCustomizations } from "../../themes/theme/customizations/treeView.jsx";
import CustomizedMuiTable from "../CustomizedMuiTable/CustomizedMuiTable.jsx";
import DashboardGraphs from "../Graphs/DashboardGraphs.jsx";
import Header from "../../utils/util-components/Header.jsx";
import { List } from "echarts";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./Dashboard.module.css";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  // ...datePickersCustomizations,
  ...treeViewCustomizations,
};

const TitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(4),
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  const { sx, ...otherProps } = props;
  return <Slide direction="left" ref={ref} {...props} sx={sx} />;
});

const Dashboard = () => {
  const { mode, setMode, systemMode } = useColorScheme();

  const l1Columns = [
    {
      field: "category",
      headerName: "Category",
      width: 250,
    },

    {
      field: "BAU_SKUcount",
      headerName: "BAU SKU Count",
      width: 150,
    },
    { field: "BAU_shipment(EU)", headerName: "BAU Shipment (EU)", width: 180 },
    {
      field: "BAU_NetValue(GBP)",
      headerName: "BAU_NetValue(GBP)",
      width: 300,
    },

    { field: "LTO_SKUcount", headerName: "LTO SKU Count", width: 150 },
    { field: "LTO_shipment(EU)", headerName: "LTO Shipment (EU)", width: 180 },
    {
      field: "LTO_NetValue(GBP)",
      headerName: "LTO Net Value (GBP)",
      width: 180,
    },

    {
      field: "categoryTotal_SKUcount",
      headerName: "Category Total SKU Count",
      width: 200,
    },
    {
      field: "categoryTotal_shipment(EU)",
      headerName: "Category Total Shipment (EU)",
      width: 230,
    },
    {
      field: "categoryTotal_NetValue(GBP)",
      headerName: "Category Total Net Value (GBP)",
      width: 240,
    },
  ];

  const [currentTableRowData, setCurrentTableRowData] = useState();
  const [currentColumnData, setCurrentColumnData] = useState(l1Columns);
  const [staticGraphData, setStaticGraphData] = useState();

  const [drillDownLevel, setDrillDownLevel] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [breadCrumbs, setBreadCrumbs] = useState(["Home"]);
  const [rowsLength, setRowsLength] = useState();
  const [searchText, setSearchText] = useState("");
  const [dataGridSortModel, setDataGridSortModel] = useState([
    { field: "sumOfEU_Quantity", sort: "asc" },
  ]);
  const [skuFilter, setSkuFilter] = useState({
    min: "",
    max: "",
  });

  //
  const [brandRowData, setBrandRowData] = useState([]);
  const [brandColumnData, setBrandColumnData] = useState([]);
  const [categoryColumnData, setCategoryColumnData] = useState([]);
  const [categoryRowData, setCategoryRowData] = useState([]);
  const [rowSelectionModel1, setRowSelectionModel1] = useState([]);
  const [rowSelectionModel2, setRowSelectionModel2] = useState([]);
  const [rowSelectionModel3, setRowSelectionModel3] = useState([]);
  //
  const onChangeSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const toggleSort = (field) => {
    setDataGridSortModel((prevModel) => {
      const existing = prevModel.find((s) => s.field === field);
      const nextSort = existing?.sort === "asc" ? "desc" : "asc"; // toggle direction

      return [{ field, sort: nextSort }];
    });
  };

  const getSortDirection = (field) => {
    const model = dataGridSortModel.find((m) => m.field === field);
    return model?.sort || null;
  };

  const handleRowClick = async (row) => {
    if (drillDownLevel === 0) {
      // Clicked on Category
      const category = row.row.category;
      setSelectedCategory(category);
      setBreadCrumbs((prev) => [...prev, category]);
      setDrillDownLevel(1);
      await fetchByCategory(category);
      setOpen(true);
    } else if (drillDownLevel === 1) {
      // Clicked on Brand inside Category
      const brand = row.row.brand;
      setSelectedBrand(brand);
      setBreadCrumbs((prev) => [...prev, brand]);
      setDrillDownLevel(2);
      await fetchByBrand(brand, selectedCategory);
      setBrandDialogOpen(true);
    }
  };

  const beautifyKey = (key) => {
    const acronyms = ["SKU", "LTO", "BAU", "GBP", "EU", "NV"];

    // Replace underscores with space
    let label = key.replace(/_/g, " ");

    // Add space before ( if missing
    label = label.replace(/\s*\(/g, " (");

    // Split words intelligently
    label = label
      .replace(/([A-Z]+)([a-z]+)/g, (_, upper, lower) => {
        // If acronym like SKU is followed by lowercase (e.g., SKUcount), insert space
        return acronyms.includes(upper)
          ? `${upper} ${lower}`
          : `${upper}${lower}`;
      })
      .replace(/([a-z])([A-Z])/g, "$1 $2"); // camelCase

    // Capitalize first letter of each word
    label = label
      .split(" ")
      .map((word) =>
        acronyms.includes(word.toUpperCase())
          ? word.toUpperCase()
          : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");

    return label;
  };

  const getKeyClockToken = async () => {
    const email = "miway";
    const password = "Mayora@123";

    const payload = new URLSearchParams();
    payload.append("username", email);
    payload.append("password", password);
    payload.append("grant_type", import.meta.env.VITE_GRANT_TYPE);
    payload.append("client_id", import.meta.env.VITE_CLIENT_ID);
    payload.append("redirect_url", import.meta.env.VITE_REDIRECT_URL);

    try {
      const tokenResponse = await axios.post(
        `${import.meta.env.VITE_KEYCLOAK_DOMAIN}/realms/${
          import.meta.env.VITE_RELM
        }/protocol/openid-connect/token`,
        payload,
        { headers: { "content-type": "application/x-www-form-urlencoded" } }
      );
      sessionStorage.setItem("cogs-token", tokenResponse.data.access_token);
    } catch (error) {
      console.log("error in fetching token", error);
    }
  };

  // const fetchCogsData = async () => {
  //   try {
  //     await getKeyClockToken();
  //     const resp = await axios.get(
  //       `${import.meta.env.VITE_GENERIC_API}/features/COGS/l1`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${sessionStorage.getItem("cogs-token")}`,
  //         },
  //       }
  //     );

  //     let rawData = resp.data.primary;

  //     let dataColumns = [];
  //     Object.keys(rawData[0]).map((keyName, keyIndex) => {
  //       if (keyName !== "_id" && keyName !== "id") {
  //         dataColumns.push({
  //           field: keyName,
  //           headerName: beautifyKey(keyName),
  //           width: beautifyKey(keyName).length * 10 + 30,
  //         });
  //       }
  //     });

  //     const rows = rawData.map((row) => ({
  //       id: row._id,
  //       ...row,
  //     }));

  //     setCurrentColumnData(dataColumns);
  //     setCurrentTableRowData(rows);
  //     setStaticGraphData(rows);
  //   } catch (error) {
  //     console.log("error in fetching cogs data", error);
  //   }
  // };
  const fetchCogsData = async () => {
    try {
      await getKeyClockToken();
      const resp = await axios.get(
        `${import.meta.env.VITE_GENERIC_API}/features/COGS/l1`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("cogs-token")}`,
          },
        }
      );

      let rawData = resp.data.primary;
      const numberFormat = new Intl.NumberFormat("en-UK");

      // Dynamically build columns
      const dataColumns = Object.keys(rawData[0])
        .filter((key) => key !== "_id" && key !== "id")
        .map((key) => {
          return {
            field: key,
            headerName: beautifyKey(key),
            width: beautifyKey(key).length * 10 + 80,

            // Format values nicely
            renderCell: (params) => {
              const rawValue = params.value;

              if (typeof rawValue === "number") {
                return numberFormat.format(rawValue);
              }

              if (typeof rawValue === "string" && /^[£\d,]+$/.test(rawValue)) {
                const numeric = parseFloat(rawValue.replace(/[£,]/g, ""));
                return `£${numberFormat.format(numeric)}`;
              }

              return rawValue ?? "N/A";
            },

            // Use numeric value for sorting
            sortComparator: (v1, v2) => {
              const num1 =
                typeof v1 === "string"
                  ? parseFloat(v1.replace(/[£,]/g, ""))
                  : v1;
              const num2 =
                typeof v2 === "string"
                  ? parseFloat(v2.replace(/[£,]/g, ""))
                  : v2;
              return num1 - num2;
            },
          };
        });

      // Rows: ensure `id` is set
      const rows = rawData.map((row) => ({
        id: row._id,
        ...row,
      }));

      setCurrentColumnData(dataColumns);
      setCurrentTableRowData(rows);
      setStaticGraphData(rows);
    } catch (error) {
      console.log("error in fetching cogs data", error);
    }
  };

  const fetchByCategory = async (category) => {
    try {
      const resp = await axios.get(
        `${
          import.meta.env.VITE_GENERIC_API
        }/features/COGS/findByCategory?category=${category}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("cogs-token")}`,
          },
        }
      );

      const rawData = resp.data.primary;
      const numberFormat = new Intl.NumberFormat("en-UK");
      if (rawData.length > 0) {
        let columns = [];
        Object.keys(rawData[0]).map((keyName, keyIndex) => {
          if (keyName !== "_id" && keyName !== "id") {
            columns.push({
              field: keyName,
              headerName: beautifyKey(keyName),
              width:
                keyName === "brand"
                  ? 200
                  : keyName === "rank"
                  ? 60
                  : beautifyKey(keyName).length * 10 + 120,
              renderCell: (params) => {
                const rawValue = params.value;

                if (typeof rawValue === "number") {
                  return numberFormat.format(rawValue);
                }

                if (
                  typeof rawValue === "string" &&
                  /^[£\d,]+$/.test(rawValue)
                ) {
                  const numeric = parseFloat(rawValue.replace(/[£,]/g, ""));
                  return `£${numberFormat.format(numeric)}`;
                }

                return rawValue ?? "N/A";
              },

              // Use numeric value for sorting
              sortComparator: (v1, v2) => {
                const num1 =
                  typeof v1 === "string"
                    ? parseFloat(v1.replace(/[£,]/g, ""))
                    : v1;
                const num2 =
                  typeof v2 === "string"
                    ? parseFloat(v2.replace(/[£,]/g, ""))
                    : v2;
                return num1 - num2;
              },
            });
          }
        });

        const rows = rawData.map((row) => ({ id: row._id, ...row }));

        // setCurrentColumnData(columns);
        // setCurrentTableRowData(rows);
        // if (drillDownLevel === 1) {
        setCategoryColumnData(columns);
        setCategoryRowData(rows);
        // }
      } else {
        setCategoryRowData([]);
        setCurrentTableRowData([]);
      }
    } catch (error) {
      console.log("Error fetching category data", error);
    }
  };

  const fetchByBrand = async (brand) => {
    try {
      await getKeyClockToken();
      const resp = await axios.get(
        `${
          import.meta.env.VITE_GENERIC_API
        }/features/COGS/findByBrand?brand=${brand}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("cogs-token")}`,
          },
        }
      );

      const rawData = resp.data.primary;
      const numberFormat = new Intl.NumberFormat("en-UK");
      if (rawData.length > 0) {
        let columns = [];
        Object.keys(rawData[0]).map((keyName, keyIndex) => {
          if (keyName !== "_id" && keyName !== "id") {
            columns.push({
              field: keyName,
              headerName: beautifyKey(keyName),
              width:
                keyName === "brand"
                  ? 200
                  : keyName === "rank"
                  ? 60
                  : beautifyKey(keyName).length * 10 + 150,

              renderCell: (params) => {
                const rawValue = params.value;

                if (typeof rawValue === "number") {
                  return numberFormat.format(rawValue);
                }

                if (
                  typeof rawValue === "string" &&
                  /^[£\d,]+$/.test(rawValue)
                ) {
                  const numeric = parseFloat(rawValue.replace(/[£,]/g, ""));
                  return `£${numberFormat.format(numeric)}`;
                }

                return rawValue ?? "N/A";
              },

              // Use numeric value for sorting
              sortComparator: (v1, v2) => {
                const num1 =
                  typeof v1 === "string"
                    ? parseFloat(v1.replace(/[£,]/g, ""))
                    : v1;
                const num2 =
                  typeof v2 === "string"
                    ? parseFloat(v2.replace(/[£,]/g, ""))
                    : v2;
                return num1 - num2;
              },
            });
          }
        });

        const rows = rawData.map((row) => ({
          id: row._id,
          ...row,
        }));
        // if (drillDownLevel === 2) {
        setBrandColumnData(columns);
        setBrandRowData(rows);
        // }
        // setCurrentColumnData(columns);
        // setCurrentTableRowData(rows);
      } else {
        setBrandRowData([]);
        setCurrentTableRowData([]);
      }
    } catch (error) {
      console.log("Error fetching brand-level data", error);
    }
  };

  //
  const [open, setOpen] = React.useState(false);
  const [brandDialogOpen, setBrandDialogOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDrillDownLevel(drillDownLevel - 1);
  };

  const handleCloseBrandDialog = () => {
    setBrandDialogOpen(false);
    setDrillDownLevel(drillDownLevel - 1);
  };
  //
  useEffect(() => {
    fetchCogsData();
  }, []);

  useEffect(() => {
    const newBreadCrumbs = breadCrumbs.slice(0, drillDownLevel + 1);

    if (newBreadCrumbs.length !== breadCrumbs.length) {
      setBreadCrumbs(newBreadCrumbs);
    }

    if (drillDownLevel === 2 && breadCrumbs[2]) {
      fetchByBrand(breadCrumbs[2]);
    } else if (drillDownLevel === 1 && breadCrumbs[1]) {
      fetchByCategory(breadCrumbs[1]);
    } else {
      fetchCogsData();
    }
  }, [drillDownLevel, breadCrumbs]);

  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <Box sx={{ flexGrow: 1, overflow: "auto", m: 1, p: 1 }}>
          <Stack spacing={2}>
            <TitleContainer sx={{ display: "flex" }}>
              <Typography variant="h3" className={styles.title}>
                F22 Baseline Analysis
              </Typography>
            </TitleContainer>

            {/* Main Content */}
            <Grid container component="main" spacing={2}>
              <Grid size={12}>
                <DashboardGraphs
                  currentTableRowData={staticGraphData}
                  drillDownLevel={0}
                />
              </Grid>
              <Paper elevation={4} sx={{ p: 1, width: "100%" }}>
                <Header
                  dataGridSortModel={dataGridSortModel}
                  toggleSort={toggleSort}
                  breadCrumbs={breadCrumbs}
                  drillDownLevel={drillDownLevel}
                  setDrillDownLevel={setDrillDownLevel}
                  setDataGridSortModel={setDataGridSortModel}
                  setCurrentTableRowData={setCurrentTableRowData}
                  currentTableRowData={currentTableRowData}
                  setRowsLength={setRowsLength}
                  skuFilter={skuFilter}
                  setSkuFilter={setSkuFilter}
                  onChangeSearchText={onChangeSearchText}
                />
              </Paper>
              <Grid item size={12}>
                <Paper elevation={4}>
                  <CustomizedMuiTable
                    dataGridSortModel={dataGridSortModel}
                    rowData={currentTableRowData}
                    columnData={currentColumnData}
                    handleRowClick={handleRowClick}
                    rowsLength={rowsLength}
                    skuFilter={skuFilter}
                    searchText={searchText}
                    rowSelectionModel={[1]}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Stack>
        </Box>

        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          TransitionProps={{ sx: { width: "81%", justifySelf: "right" } }}
          hideBackdrop
        >
          <AppBar
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              position: "sticky",
              top: 0,
              backgroundColor: "rgb(43, 46, 74)",
            }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
            <Typography sx={{ fontSize: "2rem", fontWeight: "700" }}>
              Scotch - LTO SKU Analysis Dashboard
            </Typography>
          </AppBar>

          <Grid
            item
            size={12}
            sx={{ p: 1, display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <DashboardGraphs
              currentTableRowData={categoryRowData}
              drillDownLevel={1}
            />
            <Paper elevation={4} sx={{ p: 1, width: "100%" }}>
              <Header
                dataGridSortModel={dataGridSortModel}
                toggleSort={toggleSort}
                breadCrumbs={breadCrumbs}
                drillDownLevel={drillDownLevel}
                setDrillDownLevel={setDrillDownLevel}
                setDataGridSortModel={setDataGridSortModel}
                setCurrentTableRowData={setCurrentTableRowData}
                currentTableRowData={currentTableRowData}
                setRowsLength={setRowsLength}
                skuFilter={skuFilter}
                setSkuFilter={setSkuFilter}
                onChangeSearchText={onChangeSearchText}
              />
            </Paper>
            <Paper elevation={4}>
              <CustomizedMuiTable
                dataGridSortModel={dataGridSortModel}
                rowData={categoryRowData}
                columnData={categoryColumnData}
                handleRowClick={handleRowClick}
                rowsLength={rowsLength}
                skuFilter={skuFilter}
                searchText={searchText}
                rowSelectionModel={rowSelectionModel2}
              />
            </Paper>
          </Grid>
        </Dialog>
        {/* Brand Dialog */}
        <Dialog
          fullScreen
          open={brandDialogOpen}
          onClose={handleCloseBrandDialog}
          TransitionComponent={Transition}
          TransitionProps={{ sx: { width: "65%", justifySelf: "right" } }}
          hideBackdrop
        >
          <AppBar
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              position: "sticky",
              top: 0,
              backgroundColor: "rgb(43, 46, 74)",
            }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseBrandDialog}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
            <Typography sx={{ fontSize: "2rem", fontWeight: "700" }}>
              Johnie Walker - LTO SKU Analysis Dashboard
            </Typography>
          </AppBar>

          <Grid
            item
            size={12}
            sx={{ p: 1, display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <DashboardGraphs
              currentTableRowData={brandRowData}
              drillDownLevel={2}
            />
            <Paper elevation={4} sx={{ p: 1, width: "100%" }}>
              <Header
                dataGridSortModel={dataGridSortModel}
                toggleSort={toggleSort}
                breadCrumbs={breadCrumbs}
                drillDownLevel={drillDownLevel}
                setDrillDownLevel={setDrillDownLevel}
                setDataGridSortModel={setDataGridSortModel}
                setCurrentTableRowData={setCurrentTableRowData}
                currentTableRowData={currentTableRowData}
                setRowsLength={setRowsLength}
                skuFilter={skuFilter}
                setSkuFilter={setSkuFilter}
                onChangeSearchText={onChangeSearchText}
              />
            </Paper>
            <Paper elevation={4}>
              <CustomizedMuiTable
                dataGridSortModel={dataGridSortModel}
                rowData={brandRowData}
                columnData={brandColumnData}
                handleRowClick={handleRowClick}
                rowsLength={rowsLength}
                skuFilter={skuFilter}
                searchText={searchText}
                rowSelectionModel={rowSelectionModel3}
              />
            </Paper>
          </Grid>
        </Dialog>
      </Box>
    </AppTheme>
  );
};

export default Dashboard;
