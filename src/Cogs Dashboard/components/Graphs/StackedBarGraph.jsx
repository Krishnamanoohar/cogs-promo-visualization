import React from "react";
import ReactECharts from "echarts-for-react";
import { Paper, Box, Typography } from "@mui/material";

const StackedBarGraph = ({ data }) => {
  // Aggregate total SKU and LTO SKU
  let totalSKUs = 0;
  let ltoSKUs = 0;

  data?.forEach((row) => {
    totalSKUs += row.categoryTotal_SKUcount || 0;
    ltoSKUs += row.LTO_SKUcount || 0;
  });

  const bauSKUs = totalSKUs - ltoSKUs;

  const option = {
    title: {
      text: "LTO vs BAU SKU Production",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    legend: {
      bottom: 0,
    },
    yAxis: {
      type: "category",
      data: ["Total Production"],
      axisLabel: {
        rotate: 90, // Rotate the label to make it vertical
        align: "center", // Center align the text
        verticalAlign: "middle", // Align vertically in the middle
      },
    },
    xAxis: {
      type: "value",
    },
    series: [
      {
        name: "BAU SKU",
        type: "bar",
        //   stack: "total",
        data: [bauSKUs],
        itemStyle: { color: "#1976d2" },
      },
      {
        name: "LTO SKU",
        type: "bar",
        //   stack: "total",
        data: [ltoSKUs],
        itemStyle: { color: "#ff9800" },
      },
    ],
  };

  return (
    <Paper sx={{ p: 2, minWidth: "100%" }}>
      <ReactECharts option={option} style={{ height: 250, width: "100%" }} />
      <Typography
        variant="caption"
        display="block"
        textAlign="center"
        sx={{ mt: 1 }}
      >
        LTOs represent 20% of SKUs but only 4% of shipped volume.
      </Typography>
    </Paper>
  );
};

export default StackedBarGraph;
