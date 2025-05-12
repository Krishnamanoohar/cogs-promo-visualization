import React, { useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { Box } from "@mui/material";
import GraphTitle from "../../utils/GraphTitle";

const LTOVolBrandBarGraph = ({ data, drillDownLevel }) => {
  const processedData = data
    ?.map((item) => ({
      brand:
        drillDownLevel === 1
          ? item.brand
          : drillDownLevel === 2
          ? item["SKU"]
          : null,
      value:
        drillDownLevel === 1
          ? item["LTOvol(EU)"]
          : drillDownLevel === 2
          ? item["sumOfEU_Quantity"]
          : null,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const brands = processedData.map((item) => item.brand);
  const volumes = processedData.map((item) => item.value);

  const option = {
    title: {
      // text: "LTO Volume by Brand",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params) {
        const data = params[0];
        const brand = data.name;
        const volume = data.value.toLocaleString(); // adds comma formatting
        return `Brand: <b>${brand}</b><br/>LTO Volume: <b>${volume}</b>`;
      },
    },
    xAxis: {
      type: "category",
      data: brands,
      axisLabel: {
        rotate: 0,
        interval: 0,
      },
    },
    yAxis: {
      type: "value",
      //   name: "LTO Volume (EU)",
    },
    series: [
      {
        name: "LTOvol(EU)",
        type: "bar",
        data: volumes,
        itemStyle: {
          color: "#92C5F9",
        },
      },
    ],
    grid: {
      left: "13%",
      right: "5%",
      top: "15%",
      bottom: "15%",
    },
  };
  console.log(processedData);
  return (
    <Box>
      <GraphTitle title={"Total 5 Scotch Brand By Volume"} />
      <ReactECharts option={option} style={{ height: 300 }} />
    </Box>
  );
};

export default LTOVolBrandBarGraph;
