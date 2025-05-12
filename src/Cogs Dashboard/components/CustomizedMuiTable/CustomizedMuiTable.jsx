import { Box, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

const CustomizedMuiTable = ({
  rowData,
  columnData,
  handleRowClick,
  dataGridSortModel,
  rowsLength,
  skuFilter,
  searchText,
  rowSelectionModel,
}) => {
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    let filtered = [...(rowData || [])];
    const { min, max } = skuFilter;

    if (min) {
      filtered = filtered.filter((row) => row?.BAU_SKUcount >= min);
    }

    if (max) {
      filtered = filtered.filter((row) => row?.BAU_SKUcount <= max);
    }

    if (rowsLength) {
      filtered = filtered.slice(0, rowsLength);
    }

    if (searchText.trim()) {
      const lowerSearch = searchText.toLowerCase();
      filtered = filtered.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(lowerSearch)
        )
      );
    }

    setFilteredRows(filtered);
  }, [rowData, skuFilter, rowsLength, searchText]);

  return (
    <DataGrid
      columns={columnData}
      rows={filteredRows}
      onRowClick={handleRowClick}
      getRowId={(row) => row._id}
      sortModel={dataGridSortModel}
      disableColumnSorting
      // rowSelectionModel={rowSelectionModel}
      showToolbar
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      density="compact"
      sx={{
        "& .MuiDataGrid": {
          marginBottom: "1rem",
        },
        "& .MuiDataGrid-cell:focus": {
          outline: "none",
        },
        "& .MuiDataGrid-row": {
          cursor: "pointer",
        },
        ".MuiDataGrid-row.Mui-selected": {
          color: "white",
          backgroundColor: "rgba(25, 118, 210, 0.8)", // light blue
        },
        "& .MuiDataGrid-row.Mui-selected:hover": {
          backgroundColor: "rgba(25, 118, 210, 0.9)",
        },
      }}
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small",
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small",
              },
            },
          },
        },
      }}
    />
  );
};

export default CustomizedMuiTable;
