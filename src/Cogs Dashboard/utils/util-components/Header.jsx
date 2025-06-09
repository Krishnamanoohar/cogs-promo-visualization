import * as React from "react";
import Stack from "@mui/material/Stack";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
// import CustomDatePicker from "./CustomDatePicker";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import MenuButton from "./MenuButton";
import ColorModeIconDropdown from "../../themes/shared-theme/ColorModeIconDropdown";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import Search from "./Search";
import CustomDatePicker from "./CustomDatePicker";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function Header({
  breadCrumbs,
  drillDownLevel,
  setDrillDownLevel,
  toggleSort,
  dataGridSortModel,
  setDataGridSortModel,
  setCurrentTableRowData,
  currentTableRowData,
  setRowsLength,
  skuFilter,
  setSkuFilter,
  searchText,
  onChangeSearchText,
}) {
  const [topNsvGbpValue, setTopNsvGbpValue] = React.useState();

  const getSortDirection = (field) => {
    const model = dataGridSortModel.find((m) => m.field === field);
    return model?.sort || null;
  };

  const handleTopNsvChange = (e) => {
    const topN = Number(e.target.value);

    setDataGridSortModel([{ field: "sumOf GBP NSV", sort: "desc" }]);
    setRowsLength(topN);
  };

  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        p: 1,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs
        breadCrumbs={breadCrumbs}
        drillDownLevel={drillDownLevel}
        setDrillDownLevel={setDrillDownLevel}
      />
      <Stack direction="row" sx={{ gap: 1 }}>
        {/* <Search
          searchText={searchText}
          onChangeSearchText={onChangeSearchText}
        /> */}
        {drillDownLevel === 0 && (
          <Stack direction="row" spacing={2}>
            <TextField
              type="number"
              size="small"
              label="SKU Count >"
              value={skuFilter?.min}
              onChange={(e) =>
                setSkuFilter((prev) => ({ ...prev, min: e.target.value }))
              }
            />
            <TextField
              type="number"
              size="small"
              label="SKU Count <"
              value={skuFilter.max}
              onChange={(e) =>
                setSkuFilter((prev) => ({ ...prev, max: e.target.value }))
              }
            />
          </Stack>
        )}

        {drillDownLevel === 2 && (
          <>
            <FormControl>
              <InputLabel id="top-gbp-label">
                Top Products by Revenue (GBP)
              </InputLabel>
              <Select
                labelId="top-gbp-label"
                id="top-gbp-select"
                value={topNsvGbpValue}
                label="Top Products by Revenue (GBP)"
                onChange={handleTopNsvChange}
                sx={{ width: "34ch", maxHeight: "100%" }}
              >
                <MenuItem value={22}>Top 22 Sum Of GBP NSV</MenuItem>
                <MenuItem value={30}>Top 30 Sum Of GBP NSV</MenuItem>
                <MenuItem value={40}>Top 40 Sum Of GBP NSV</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              size="small"
              startIcon={
                getSortDirection("sumOfEU_Quantity") === "desc" ? (
                  <ArrowUpwardIcon fontSize="small" />
                ) : (
                  <ArrowDownwardIcon fontSize="small" />
                )
              }
              sx={{ minWidth: "fit-content" }}
              onClick={() => toggleSort("sumOfEU_Quantity")}
            >
              Sort By Quantity
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={
                getSortDirection("sumOf GBP NSV") === "asc" ? (
                  <ArrowUpwardIcon fontSize="small" />
                ) : (
                  <ArrowDownwardIcon fontSize="small" />
                )
              }
              sx={{ minWidth: "fit-content" }}
              onClick={() => toggleSort("sumOf GBP NSV")}
            >
              Sort By Value
            </Button>
          </>
        )}
        {/* <CustomDatePicker /> */}
        {/* <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton> */}
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
