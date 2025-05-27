import * as React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import MenuContent from "./MenuContent";
import SelectContent from "../../utils/util-components/SelectContent";
import CardAlert from "../../../assets/components/MUI Dashboard/dashboard-mui/components/CardAlert";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function SideMenu() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  return (
    <Box sx={{ boxShadow: 4 }}>
      <Drawer
        variant="permanent"
        sx={{
          [`& .${drawerClasses.paper}`]: {
            // backgroundColor: "#DADADA",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            // mt: "calc(var(--template-frame-height, 0px) + 4px)",
            // p: 1.5,
            borderRadius: "5px",
          }}
        >
          <SelectContent />
        </Box>
        <Divider sx={{ color: "white" }} />
        <Box
          sx={{
            overflow: "auto",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <MenuContent
            selectedItemIndex={selectedItemIndex}
            setSelectedItemIndex={setSelectedItemIndex}
          />
          {/* <CardAlert /> */}
        </Box>
        <Stack
          direction="row"
          sx={{
            p: 2,
            gap: 1,
            alignItems: "center",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Avatar
            sizes="small"
            alt="Riley Carter"
            src="/static/images/avatar/7.jpg"
            sx={{ width: 36, height: 36 }}
          />
          <Box sx={{ mr: "auto" }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, lineHeight: "16px" }}
            >
              Krishna Manohar
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              krishna@email.com
            </Typography>
          </Box>
        </Stack>
      </Drawer>
    </Box>
  );
}
