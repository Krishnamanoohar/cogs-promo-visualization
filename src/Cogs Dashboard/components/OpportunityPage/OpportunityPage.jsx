import React from "react";
import SideMenu from "../SideMenuDrawer/SideMenu";
import AppTheme from "../../themes/shared-theme/AppTheme";
import { Box, Button, CssBaseline, Typography } from "@mui/material";
import { chartsCustomizations } from "../../themes/theme/customizations/charts.jsx";
import { dataGridCustomizations } from "../../themes/theme/customizations/dataGrid";
import { treeViewCustomizations } from "../../themes/theme/customizations/treeView.jsx";

const OpportunityPage = () => {
  const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...treeViewCustomizations,
  };
  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
      </Box>
    </AppTheme>
  );
};

export default OpportunityPage;
