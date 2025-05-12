import * as React from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center",
  },
}));

export default function NavbarBreadcrumbs({
  breadCrumbs,
  drillDownLevel,
  setDrillDownLevel,
}) {
  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {breadCrumbs?.map((item, itemIndex) => {
        return (
          <Typography
            key={itemIndex}
            onClick={() => {
              setDrillDownLevel(itemIndex);
            }}
            sx={{
              color: drillDownLevel === itemIndex ? "text.primary" : "",
              fontWeight: drillDownLevel === itemIndex ? 600 : "",
              cursor: "pointer",
            }}
            variant="body1"
          >
            {item}
          </Typography>
        );
      })}
    </StyledBreadcrumbs>
  );
}
