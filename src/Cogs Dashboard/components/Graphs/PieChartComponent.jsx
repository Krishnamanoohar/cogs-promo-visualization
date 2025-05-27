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
      textStyle: {
        color: "#000000",
        fontWeight: 500,
      },
    },
    // series: [
    //   {
    //     name: title,
    //     type: "pie",
    //     radius: "55%",
    //     data,
    //     emphasis: {
    //       itemStyle: {
    //         shadowBlur: 10,
    //         shadowOffsetX: 0,
    //         shadowColor: "rgba(0, 0, 0, 0.5)",
    //       },
    //     },
    //   },
    // ],
    series: [
      {
        name: title,
        type: "pie",
        radius: "55%",
        data,
        label: {
          show: true,
          formatter: "{d}%", // Shows label name and percentage
          position: "inside", // or 'outside' if you want labels outside the pie
          fontSize: 11,
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

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        "& > canvas": {},
      }}
    >
      <ReactECharts
        option={options}
        className="pie"
        style={{
          display: "flex",
          alignSelf: "center",
          height: 250,
          width: "100%",
        }}
      />
    </Box>
  );
};

export default PieChartComponent;
