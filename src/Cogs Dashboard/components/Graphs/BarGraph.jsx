import React from "react";
import ReactECharts from "echarts-for-react";
import { Box, Paper } from "@mui/material";
import GraphTitle from "../../utils/GraphTitle";

const CategoryLTOBarGraph = ({ data }) => {
  const categories = data?.map((item) => item.category);
  const ltoShipments = data?.map((item) => item["LTO_shipment(EU)"]);

  const option = {
    title: {
      // text: "LTO Volumes Ranked by Category",
      left: "center",
    },
    color: [
      "rgb(92, 123, 217)",
      "rgb(64, 178, 125)",
      "rgb(237, 102, 102)",
      "rgb(255, 220, 96)",
      "rgb(112, 140, 127)",
      "rgb(159, 224, 128)",
    ],

    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      top: "bottom",
      textStyle: {
        color: "#000000",
        fontWeight: 501,
      },
    },
    series: [
      {
        name: "LTO Shipment (EU)",
        type: "pie",
        radius: "70%",
        data: categories?.map((category, index) => ({
          name: category,
          value: ltoShipments[index],
        })),
        label: {
          show: true,
          formatter: "{d}%", // Shows label name and percentage
          position: "inside", // or 'outside' if you want labels outside the pie
          fontSize: 12,
          fontWeight: 700,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  const barOption = {
    title: {
      text: "LTO Volumes ranked by Category",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      type: "category",
      data: categories,
      axisLabel: {
        rotate: 30,
      },
    },
    yAxis: {
      type: "value",
      name: "LTO Shipment (EU)",
    },
    series: [
      {
        data: ltoShipments,
        type: "bar",
        itemStyle: {
          color: "#1976d2",
        },
        label: {
          show: true,
          position: "top",
        },
      },
    ],
  };

  return (
    <Paper>
      <GraphTitle title={"Volumes Ranked by Category"} />
      <ReactECharts option={option} style={{ height: 350, width: "100%" }} />
    </Paper>
  );
};

export default CategoryLTOBarGraph;
// "#ffd92f",
// "#66c2a5",
// "#fc8d62",
// "#8da0cb",
// "#e78ac3",
// "#719437",

// "#F5ECD5", // Orange
// "#DFD0B8", // Red
// "#76B7B2", // Teal
// "#A2B9A7", // Green
// "#A2B9A7", // Yellow
// "#AF7AA1", // Purple
// "#FF9DA7", // Soft Red-Pink
// "#9C755F", // Brown
