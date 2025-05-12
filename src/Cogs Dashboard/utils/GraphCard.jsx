import { Box, Typography } from "@mui/material";
import React from "react";

const GraphCard = ({ title, value }) => {
  return (
    <Box>
      {/* Card Title */}
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

      {/* Card Body */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          justifySelf: "center",
          alignSelf: "center",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            fontSize: "1.5rem",
            fontWeight: 800,
            padding: "1.5rem 0",
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default GraphCard;
