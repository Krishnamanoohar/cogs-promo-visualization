import { Box, Typography } from "@mui/material";
import React from "react";

const GraphTitle = ({ title, titleBg }) => {
  return (
    <Box
      sx={{
        backgroundColor: titleBg || "#021c51",
        borderRadius: "10px 10px 0 0",
        padding: "10px 0",
      }}
    >
      <Typography
        sx={{
          color: "white",
          p: 1,
          textAlign: "center",
          // fontFamily: "Montserrat, sans-serif",
          fontFamily: "Poppins, sans-serif",
          letterSpacing: "0.5px",
          fontSize: "17px",
          fontWeight: "600",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default GraphTitle;
