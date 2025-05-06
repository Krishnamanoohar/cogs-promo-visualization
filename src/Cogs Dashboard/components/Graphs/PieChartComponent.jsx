// components/PieChartComponent.jsx
import React, { useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { Box } from "@mui/material";

const PieChartComponent = ({ title, data }) => {
  const options = {
    title: {
      text: title,
      left: "center",
      top: 10,
      textStyle: {
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      bottom: 10,
      left: "center",
    },
    series: [
      {
        name: title,
        type: "pie",
        radius: "55%",
        data,
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

  return (
    <Box sx={{ width: "100%" }}>
      <ReactECharts option={options} style={{ height: 300, width: "100%" }} />
    </Box>
  );
};

export default PieChartComponent;
