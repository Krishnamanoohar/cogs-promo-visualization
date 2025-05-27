import * as React from "react";
import MuiAvatar from "@mui/material/Avatar";
import MuiListItemAvatar from "@mui/material/ListItemAvatar";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
import Select, { selectClasses } from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import { Box, Typography } from "@mui/material";
import styles from "./SelectContent.module.css";
import { Navigate, useNavigate } from "react-router-dom";

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

export default function SelectContent() {
  const [company, setCompany] = React.useState("");

  const handleChange = (event) => {
    setCompany(event.target.value);
  };

  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%" }}>
      {/* <MenuItem value="">
        <ListItemAvatar>
          <Avatar alt="Analytics Overview">
            <DevicesRoundedIcon sx={{ fontSize: "1rem" }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Analytics Overview" secondary="Summary stats" />
      </MenuItem>
      <MenuItem value={10}>
        <ListItemAvatar>
          <Avatar alt="Category View">
            <SmartphoneRoundedIcon sx={{ fontSize: "1rem" }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Category View" secondary="By category" />
      </MenuItem>
      <MenuItem value={20}>
        <ListItemAvatar>
          <Avatar alt="Brand Performance">
            <DevicesRoundedIcon sx={{ fontSize: "1rem" }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Brand Performance" secondary="By brand" />
      </MenuItem>
      <ListSubheader>Development</ListSubheader>
      <MenuItem value={30}>
        <ListItemAvatar>
          <Avatar alt="Admin Tools">
            <ConstructionRoundedIcon sx={{ fontSize: "1rem" }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Admin Tools" secondary="Tools" />
      </MenuItem>
      <Divider sx={{ mx: -1 }} />
      <MenuItem value={40}>
        <ListItemIcon>
          <AddRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Add New Module" secondary="Customize" />
      </MenuItem> */}
      <p
        onClick={() => navigate("/")}
        className={styles.logo}
        style={{
          textAlign: "center",
          fontSize: "48px",
          fontFamily: "Monofett, monospace",
          fontFamily: "Honk, system-ui",
          fontFamily: "Vast Shadow, serif",
          fontFamily: "Playwrite HU, cursive",
          fontFamily: "Alfa Slab One, serif",
          // fontFamily: `Codystar, sans-serif`,
          color: "#021c51",
          // fontWeight: 900,
          letterSpacing: "4px",
          borderRadius: "5px",
          padding: "0.6rem 0",
          cursor: "pointer",
        }}
      >
        COGS
      </p>
    </Box>
  );
}
