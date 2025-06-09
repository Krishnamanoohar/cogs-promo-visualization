import React, { useState } from "react";
import {
  Card,
  Typography,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Box,
  Button,
} from "@mui/material";
import {
  MailOutline,
  ImageOutlined,
  PictureAsPdfOutlined,
  TableChartOutlined,
  MoreVert,
  CloseOutlined,
} from "@mui/icons-material";
import ReactECharts from "echarts-for-react";

export default function InsightPopupCard({
  insightData,
  insightType,
  onClosePopup,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { title, content } = insightData;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const chartOptions = {
    title: {
      text: "Order Volume by Month",
      left: "center",
      textStyle: { fontSize: 14 },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    legend: {
      data: ["Requested", "Remaining"],
      bottom: 0,
    },
    grid: { top: 40, bottom: 60, left: 40, right: 10 },
    xAxis: {
      type: "category",
      data: ["Sep’21", "Oct’21", "Nov’21", "Dec’21"],
      axisLabel: {
        color: "black",
      },
    },
    yAxis: {
      type: "value",
      name: "Cases",
      axisLabel: {
        color: "black",
      },
    },
    series: [
      {
        name: "Requested",
        type: "bar",
        stack: "total",
        emphasis: { focus: "series" },
        data: [100, 150, 310, 80],
        itemStyle: { color: "#1976d2" },
      },
      {
        name: "Remaining",
        type: "bar",
        stack: "total",
        emphasis: { focus: "series" },
        data: [20, 10, 40, 30],
        itemStyle: { color: "#90caf9" },
      },
    ],
  };

  return (
    <Card elevation={3} sx={{ width: "100%", borderRadius: 3, p: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: "24px", fontWeight: 600 }}
          >
            {title}
          </Typography>
          <Button
            variant="outlined"
            sx={{ width: "10px" }}
            onClick={() => onClosePopup()}
          >
            <CloseOutlined />
          </Button>
        </Box>

        {content?.map((item, itemIndex) => {
          return <Typography key={itemIndex}>▪ {item}</Typography>;
        })}

        {insightType === "observations" && (
          <Box sx={{ height: 250, mt: 2 }}>
            <ReactECharts option={chartOptions} style={{ height: "100%" }} />
          </Box>
        )}

        <Divider sx={{ my: 1 }} />
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={1}>
            <IconButton size="small">
              <MailOutline />
            </IconButton>
            <IconButton size="small">
              <ImageOutlined />
            </IconButton>
          </Stack>
          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>
              <MailOutline sx={{ mr: 1 }} fontSize="small" /> Send as Email
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ImageOutlined sx={{ mr: 1 }} fontSize="small" /> Export as Image
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <PictureAsPdfOutlined sx={{ mr: 1 }} fontSize="small" /> Export as
              PDF
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <TableChartOutlined sx={{ mr: 1 }} fontSize="small" /> Export as
              CSV
            </MenuItem>
          </Menu>
        </Stack>
      </Box>
    </Card>
  );
}
