import React, { useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { Box, Typography } from "@mui/material";
import GraphTitle from "../../utils/GraphTitle";

const BrandsStackedBarGraph = ({ processedData }) => {
  // Prepare labels and values
  processedData = processedData.reverse();
  const brands = processedData?.map((item) => item.brand);
  let values = processedData?.map((item) => item.value);

  const option = {
    title: {
      // text: "Top 5 LTO NV (GBP)",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params) => {
        const val = params[0].value.toLocaleString("en-UK", {
          style: "currency",
          currency: "GBP",
        });
        return `${params[0].name}: ${val}`;
      },
    },
    xAxis: {
      type: "value",
      axisLabel: {
        formatter: (val) => "£" + val.toLocaleString("en-UK"),
        color: "#000000",
      },
    },
    yAxis: {
      type: "category",
      data: brands,
      axisLabel: {
        interval: 0,
        rotate: 0,
        color: "#000000",
      },
    },
    series: [
      {
        name: "LTO NV (GBP)",
        type: "bar",
        data: values,
        itemStyle: {
          color: "#4663ac",
        },
      },
    ],
    grid: {
      left: "17%",
      right: "10%",
      top: "15%",
      bottom: "20%",
    },
  };

  return (
    <Box sx={{ borderRadius: "10px" }}>
      <GraphTitle
        title={"Top 5 Scotch Brand By Value"}
        // titleBg={"rgb(2, 28, 81, 1)"}
        titleBg={"rgb(2, 28, 81, 1)"}
      />
      <ReactECharts option={option} style={{ height: 300, width: "100%" }} />
    </Box>
  );
};

export default BrandsStackedBarGraph;
