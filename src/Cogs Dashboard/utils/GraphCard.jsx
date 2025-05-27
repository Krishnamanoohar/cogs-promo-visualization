import { Box, Typography } from "@mui/material";
import React from "react";
import GraphTitle from "./GraphTitle";

const GraphCard = ({ title, value }) => {
  return (
    <Box>
      {/* Card Title */}
      <Box
        sx={{
          backgroundColor: "rgb(2, 28, 81, 1)",
          borderRadius: "10px 10px 0 0",
          padding: "10px 0",
        }}
      >
        <Typography
          sx={{
            color: "white",
            p: 1,
            fontFamily: "Nunito Sans, sans-serif",
            fontSize: "15px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
      </Box>
      {/* <GraphTitle title={title} /> */}

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
            fontWeight: 600,
            padding: "1.5rem 0",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default GraphCard;
