import React from "react";
import ReactECharts from "echarts-for-react";
import GraphTitle from "../../utils/GraphTitle";

const SubBrandStackedBarGraph = ({ rawData }) => {
  // Function to parse and clean the currency string into a number
  const parseQuantity = (value) => {
    return Number(value.replace(/[£,]/g, "")); // Remove currency symbol and commas, then convert to number
  };

  // Prepare the data for the graph
  const prepareGraphData = (data) => {
    const sortedData = data
      ?.map((item) => ({
        brand: item["SKU"], // Using sizeAndBrandL5 as label
        quantity: item?.sumOfEU_Quantity,
      }))
      .sort((a, b) => b.quantity - a.quantity) // Sort by sumOfEU_Quantity in descending order
      .slice(0, 5); // Get top 5
    return sortedData;
  };

  // Prepare the data for chart
  const chartData = prepareGraphData(rawData);

  // ECharts option for horizontal bar chart
  const getChartOptions = () => {
    return {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} EU Quantity", // Show brand name and value
      },
      yAxis: {
        type: "value",
        nameGap: 40,
        axisLabel: {
          color: "#000000",
        },
      },
      xAxis: {
        type: "category",
        data: chartData?.map((item) => item.brand),
        axisLabel: {
          interval: 0,
          rotate: 0,
          color: "#000000",
        },
      },
      series: [
        {
          type: "bar",
          data: chartData?.map((item) => item.quantity),
          itemStyle: {
            color: "#4663ac", // Custom bar color
          },
        },
      ],
      grid: {
        left: "13%",
        right: "10%",
        top: "15%",
        bottom: "25%",
      },
    };
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <GraphTitle title={"Total 5 JW Brand By Volume"} />
      <ReactECharts option={getChartOptions()} style={{ height: "100%" }} />
    </div>
  );
};

export default SubBrandStackedBarGraph;
