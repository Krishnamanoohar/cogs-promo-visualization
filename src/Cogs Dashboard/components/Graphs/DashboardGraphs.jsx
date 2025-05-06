import React from "react";
import { Box, Divider, Grid, Paper, Typography, Stack } from "@mui/material";
import PieChartComponent from "./PieChartComponent";
import StackedBarGraph from "./StackedBarGraph";
import CategoryLTOBarGraph from "./BarGraph";
import MultipleBarGraph from "./MultipleBarGraph";

const DashboardGraphs = ({ currentTableRowData }) => {
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

  return (
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
          padding: 3,
          // background: "linear-gradient(145deg, #f0f0f0, #dcdcdc)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#333",
          transform: "scale(1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: 6,
          },
        }}
      >
        <Stack direction="column" alignItems="center" spacing={1}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              textTransform: "uppercase",
              // color: "#757575",
              letterSpacing: "0.5px",
              marginBottom: 1,
            }}
          >
            Total LTO Volume Shipped
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#1976d2",
              fontSize: "4rem",
              letterSpacing: "1px",
              display: "flex",
              alignItems: "center",
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

      <Grid size={3} item sx={{ boxShadow: 4, borderRadius: "10px" }}>
        <PieChartComponent title="SKU Count" data={parsePieData("SKUcount")} />
      </Grid>
      <Grid size={6} item sx={{ boxShadow: 4, borderRadius: "10px" }}>
        <MultipleBarGraph data={currentTableRowData} />
      </Grid>
      <Grid size={6} item sx={{ boxShadow: 4, borderRadius: "10px" }}>
        <CategoryLTOBarGraph data={currentTableRowData} />
      </Grid>
    </Grid>
  );
};

export default DashboardGraphs;

{
  /* <Box sx={{ width: "33%" }} item xs={1} md={4}>
          <PieChartComponent
            title="Shipment (EU)"
            data={parsePieData("shipment(EU)")}
          />
        </Box>
        <Box sx={{ width: "33%" }} item xs={1} md={4}>
          <PieChartComponent
            title="Net Value (GBP)"
            data={parsePieData("NetValue(GBP)")}
          />
        </Box> */
}
