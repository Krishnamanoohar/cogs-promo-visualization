import { Box, Typography } from "@mui/material";
import React from "react";

const GraphTitle = ({ title }) => {
  return (
    <Box sx={{ backgroundColor: "#2b2e4a", borderRadius: "10px 10px 0 0" }}>
      <Typography
        sx={{
          color: "white",
          p: 1,
          fontFamily: "Nunito Sans, sans-serif",
          fontSize: "15px",
          fontWeight: "600",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default GraphTitle;
