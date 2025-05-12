import React, { useEffect } from "react";
import {
  Box,
  Divider,
  Grid,
  Paper,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import PieChartComponent from "./PieChartComponent";
import StackedBarGraph from "./StackedBarGraph";
import CategoryLTOBarGraph from "./BarGraph";
import MultipleBarGraph from "./MultipleBarGraph";
import BrandsStackedBarGraph from "./BrandsStackedBarGraph";
import LTOVolBrandBarGraph from "./LTOVolBrandBarGraph";
import GraphTitle from "../../utils/GraphTitle";
import GraphCard from "../../utils/GraphCard";
import SubBrandStackedBarGraph from "./SubBrandStackedBarGraph";

const DashboardGraphs = ({ currentTableRowData, drillDownLevel }) => {
  const parsePieData = (type) => {
    const totalBAU = currentTableRowData?.reduce(
      (sum, item) => sum + item[`BAU_${type}`],
      0
    );

    const totalLTO = currentTableRowData?.reduce(
      (sum, item) => sum + item[`LTO_${type}`],
      0
    );

    return [
      { value: totalBAU, name: "BAU" },
      { value: totalLTO, name: "LTO" },
    ];
  };

  const processedData = currentTableRowData
    ?.map((item) => ({
      brand: item.brand,
      value: Number(item["LTO NV(GBP)"]?.replace(/[£,]/g, "")), // convert string to number
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <>
      {drillDownLevel === 0 && (
        <Grid container spacing={2}>
          <Grid item size={6} sx={{ boxShadow: 4, borderRadius: "10px" }}>
            <StackedBarGraph data={currentTableRowData} />
          </Grid>
          <Grid
            item
            size={3}
            sx={{
              boxShadow: 3,
              borderRadius: "12px",
              // padding: 3,
              // background: "linear-gradient(145deg, #f0f0f0, #dcdcdc)",
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
              color: "#333",
              transform: "scale(1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            <GraphTitle title={"Total LTO Volume Shipped"} />
            <Stack
              direction="column"
              alignItems="center"
              spacing={1}
              sx={{ marginTop: "2rem" }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#1976d2",
                  fontSize: "3rem",
                  letterSpacing: "1px",
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "center",
                }}
              >
                3.08M
                <Typography
                  variant="body2"
                  sx={{ marginLeft: 1, fontWeight: 600, color: "#1976d2" }}
                >
                  EQ Units
                </Typography>
              </Typography>

              {/* Optional: Add a relevant icon */}
              <Typography sx={{ fontSize: "4rem", color: "#1976d2" }}>
                📦
              </Typography>
            </Stack>
          </Grid>

          <Grid
            size={3}
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              boxShadow: 4,
              borderRadius: "10px",
            }}
          >
            <GraphTitle title={"SKU Count"} />
            <PieChartComponent
              // title="SKU Count"
              data={parsePieData("SKUcount")}
            />
          </Grid>
          <Grid size={6} item sx={{ boxShadow: 4, borderRadius: "10px" }}>
            <MultipleBarGraph data={currentTableRowData} />
          </Grid>
          <Grid size={6} item sx={{ boxShadow: 4, borderRadius: "10px" }}>
            <CategoryLTOBarGraph data={currentTableRowData} />
          </Grid>
        </Grid>
      )}

      {drillDownLevel === 1 && (
        <Grid container spacing={2}>
          <Grid
            item
            size={6}
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box
              sx={{
                height: "50%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: 2,
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  backgroundColor: "",
                  width: "100%",
                  borderRadius: "10px",
                }}
              >
                <GraphCard
                  title={"Avg LTO Volume (EU) Per SKU"}
                  value={"2311 EU"}
                />
              </Paper>
              <Paper elevation={2} sx={{ backgroundColor: "", width: "100%" }}>
                <GraphCard
                  title={"% Of Total Scotch Volume Shipped"}
                  value={"4%"}
                />
              </Paper>
            </Box>
            <Box
              sx={{
                height: "50%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: 2,
              }}
            >
              <Paper elevation={2} sx={{ backgroundColor: "", width: "100%" }}>
                <GraphCard title={"Avg LTO NSV Per SKU"} value={"$176,999"} />
              </Paper>
            </Box>
          </Grid>
          <Grid
            item
            size={6}
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box
              sx={{
                height: "50%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: 2,
              }}
            >
              <Paper elevation={2} sx={{ backgroundColor: "", width: "100%" }}>
                <GraphCard title={"Total Scotch LTO SKUs"} value={673} />
              </Paper>
              <Paper elevation={2} sx={{ backgroundColor: "", width: "100%" }}>
                <GraphCard
                  title={"% Of All Scotch SKUs Produced"}
                  value={"31%"}
                />
              </Paper>
            </Box>

            <Box
              sx={{
                height: "50%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: 2,
              }}
            >
              <Paper elevation={2} sx={{ backgroundColor: "", width: "100%" }}>
                <GraphCard title={"LTO Volume (EU)"} value={"1,555,572"} />
              </Paper>
              <Paper elevation={2} sx={{ backgroundColor: "", width: "100%" }}>
                <GraphCard title={"LTO Net Value"} value={" $ 119,128,711"} />
              </Paper>
            </Box>
          </Grid>
          <Grid item size={6} sx={{ boxShadow: 4, borderRadius: "10px" }}>
            <BrandsStackedBarGraph processedData={processedData} />
          </Grid>
          <Grid size={6} item sx={{ boxShadow: 4, borderRadius: "10px" }}>
            <LTOVolBrandBarGraph
              data={currentTableRowData}
              drillDownLevel={drillDownLevel}
            />
          </Grid>
        </Grid>
      )}

      {drillDownLevel === 2 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                display: "flex",
                justifySelf: "right",
                backgroundColor: "#2b2e4a",
                padding: "0 20px",
                borderRadius: "20px",
              }}
            >
              <Typography sx={{ color: "white" }}>View Analysis</Typography>
            </Button>
          </Box>

          <Grid container spacing={2}>
            <Grid
              item
              size={6}
              spacing={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  height: "50%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                }}
              >
                <Paper
                  elevation={2}
                  sx={{ backgroundColor: "", width: "100%" }}
                >
                  <GraphCard title={"Total Scotch LTO SKUs"} value={673} />
                </Paper>
                <Paper
                  elevation={2}
                  sx={{ backgroundColor: "", width: "100%" }}
                >
                  <GraphCard
                    title={"% Of All Scotch SKUs Produced"}
                    value={"31%"}
                  />
                </Paper>
              </Box>
              <Box
                sx={{
                  height: "50%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                }}
              >
                <Paper
                  elevation={2}
                  sx={{ backgroundColor: "", width: "100%" }}
                >
                  <GraphCard title={"LTO Volume (EU)"} value={"1,555,572"} />
                </Paper>
                <Paper
                  elevation={2}
                  sx={{ backgroundColor: "", width: "100%" }}
                >
                  <GraphCard title={"LTO Net Value"} value={" $ 119,128,711"} />
                </Paper>
              </Box>
            </Grid>
            <Grid
              item
              size={6}
              spacing={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  height: "50%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    backgroundColor: "",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                >
                  <GraphCard
                    title={"Avg LTO Volume (EU) Per SKU"}
                    value={"2311 EU"}
                  />
                </Paper>
                <Paper
                  elevation={2}
                  sx={{ backgroundColor: "", width: "100%" }}
                >
                  <GraphCard
                    title={"% Of Total Scotch Vol Shipped"}
                    value={"4%"}
                  />
                </Paper>
              </Box>
              <Box
                sx={{
                  height: "50%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                }}
              >
                <Paper
                  elevation={2}
                  sx={{ backgroundColor: "", width: "100%" }}
                >
                  <GraphCard title={"Avg LTO NSV Per SKU"} value={"$176,999"} />
                </Paper>
              </Box>
            </Grid>
            <Grid size={6} item sx={{ boxShadow: 4, borderRadius: "10px" }}>
              <LTOVolBrandBarGraph
                data={currentTableRowData}
                drillDownLevel={drillDownLevel}
              />
            </Grid>
            <Grid item size={6} sx={{ boxShadow: 4, borderRadius: "10px" }}>
              <SubBrandStackedBarGraph rawData={currentTableRowData} />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default DashboardGraphs;
