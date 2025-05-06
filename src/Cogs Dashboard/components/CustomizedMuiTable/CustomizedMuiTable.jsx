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
}) => {
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    let filtered = [...(rowData || [])];
    const { min, max } = skuFilter;

    if (min) {
      filtered = filtered.filter((row) => row?.BAU_SKUcount >= min);
      console.log("filtered", filtered);
    }

    if (max) {
      filtered = filtered.filter((row) => row?.BAU_SKUcount <= max);
      console.log("filtered", filtered);
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
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 22 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      density="compact"
      sx={{
        "& .MuiDataGrid-cell:focus": {
          outline: "none",
        },
        "& .MuiDataGrid-row": {
          cursor: "pointer",
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
