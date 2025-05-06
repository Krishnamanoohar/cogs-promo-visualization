import React from "react";
import ReactECharts from "echarts-for-react";
import { Paper } from "@mui/material";

const MultipleBarGraph = ({ data }) => {
  const categories = data?.map((item) => item.category);

  const categoryTotal = data?.map((item) => item["categoryTotal_shipment(EU)"]);
  const bau = data?.map((item) => item["BAU_shipment(EU)"]);
  const lto = data?.map((item) => item["LTO_shipment(EU)"]);

  const option = {
    title: {
      text: "Volumes ranked by Category",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    legend: {
      top: 30,
      data: ["Total Shipment", "BAU Shipment", "LTO Shipment"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: categories,
      axisLabel: { rotate: 30 },
    },
    yAxis: {
      type: "value",
      // name: "Shipment (EU)",
    },
    series: [
      {
        name: "Total Shipment",
        type: "bar",
        data: categoryTotal,
        itemStyle: { color: "#1976d2" },
      },
      {
        name: "BAU Shipment",
        type: "bar",
        data: bau,
        itemStyle: { color: "#66bb6a" },
      },
      {
        name: "LTO Shipment",
        type: "bar",
        data: lto,
        itemStyle: { color: "#ef5350" },
      },
    ],
  };

  return (
    <Paper sx={{ p: "10px 0 0 15px" }}>
      <ReactECharts option={option} style={{ height: 400 }} />
    </Paper>
  );
};

export default MultipleBarGraph;
