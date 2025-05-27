import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import { Divider, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon />, path: "/" },
  {
    text: "Analytics",
    icon: <AnalyticsRoundedIcon />,
    path: "/variance-analysis",
  },
  { text: "Output", icon: <PeopleRoundedIcon />, path: "/output" },
  {
    text: "Opportunity",
    icon: <AssignmentRoundedIcon />,
    path: "/opportunity",
  },
];

const secondaryListItems = [
  { text: "Settings", icon: <SettingsRoundedIcon /> },
  { text: "About", icon: <InfoRoundedIcon /> },
  { text: "Feedback", icon: <HelpRoundedIcon /> },
];

export default function MenuContent({
  selectedItemIndex,
  setSelectedItemIndex,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (index) => {
    setSelectedItemIndex(index);
  };

  return (
    <Stack
      sx={{
        flexGrow: 1,
        justifyContent: "space-between",
        borderRadius: "10px",
      }}
    >
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {mainListItems.map((item, index) => (
          <div key={index}>
            <div
              onClick={() => {
                navigate(item.path);
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor:
                  location.pathname === item.path ? "#021c51" : "transparent",
                cursor: "pointer",
                height: "100%",
                padding: "1rem 0",
                borderRadius: "2px",
              }}
            >
              <li
                selected={true}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                  alignItems: "center",
                  width: "100%",
                  paddingLeft: "2rem",
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      location.pathname === item.path ? "white" : "#021c51",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <Typography
                  sx={{
                    color: "#021c51",
                    fontSize: "1rem",
                    fontWeight: 500,
                    fontFamily: "Poppins, sans-serif",
                    color:
                      location.pathname === item.path ? "white" : "#021c51",
                  }}
                >
                  {item.text}
                </Typography>
                {/* <ListItemText
                primary={item.text}
                sx={{ color: "#021c51", fontSize: "1rem", fontWeight: "800" }}
              /> */}
              </li>
            </div>
            <Divider color="white" sx={{ height: "1px" }} />
          </div>
        ))}
      </ul>
      <List
        dense
        sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
      >
        {secondaryListItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemButton sx={{ paddingLeft: "2rem" }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Typography
                sx={{
                  color: "#021c51",
                  fontSize: "0.8rem",
                  fontWeight: "800",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {item.text}{" "}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
