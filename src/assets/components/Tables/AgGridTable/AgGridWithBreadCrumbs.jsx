// import React, { useState, useMemo, useCallback } from "react";
// import { AgGridReact } from "ag-grid-react";
// import { Box, Typography, Breadcrumbs, Link, Paper } from "@mui/material";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

// const initialData = [
//   {
//     category: "Scotch",
//     bau1_sku: 1494,
//     bau1_ship: "38,368,129",
//     bau1_value: "£2,222,458,596",
//     bau2_sku: 673,
//     bau2_ship: "1,555,572",
//     bau2_value: "£119,128,711",
//     bau3_sku: 2167,
//     bau3_ship: "39,923,701",
//     bau3_value: "£2,341,587,308",
//   },
//   {
//     category: "Europe Spirits",
//     bau1_sku: 979,
//     bau1_ship: "27,502,623",
//     bau1_value: "£903,768,933",
//     bau2_sku: 2,
//     bau2_ship: "291,169",
//     bau2_value: "£19,799,894",
//     bau3_sku: 1000,
//     bau3_ship: "27,793,792",
//     bau3_value: "£923,568,827",
//   },
//   {
//     category: "Baileys",
//     bau1_sku: 201,
//     bau1_ship: "9,485,459",
//     bau1_value: "£450,064,197",
//     bau2_sku: 3,
//     bau2_ship: "635,415",
//     bau2_value: "£34,662,947",
//     bau3_sku: 237,
//     bau3_ship: "10,120,874",
//     bau3_value: "£484,727,144",
//   },
//   {
//     category: "F22 Grand Total",
//     bau1_sku: 3075,
//     bau1_ship: "9,561,612",
//     bau1_value: "£468,094,200",
//     bau2_sku: 773,
//     bau2_ship: "3,082,656",
//     bau2_value: "£173,931,238",
//     bau3_sku: 3848,
//     bau3_ship: "85,852,094",
//     bau3_value: "£3,768,252,968",
//   },
// ];

// // Simulated nested child data
// const getChildData = (parentName) => [
//   {
//     category: `${parentName} Detail A`,
//     bau1_sku: 123,
//     bau1_ship: "1,234,567",
//     bau1_value: "£12,345,678",
//     bau2_sku: 456,
//     bau2_ship: "4,567,890",
//     bau2_value: "£45,678,901",
//     bau3_sku: 789,
//     bau3_ship: "7,890,123",
//     bau3_value: "£78,901,234",
//   },
//   {
//     category: `${parentName} Detail B`,
//     bau1_sku: 321,
//     bau1_ship: "2,345,678",
//     bau1_value: "£23,456,789",
//     bau2_sku: 654,
//     bau2_ship: "5,678,901",
//     bau2_value: "£56,789,012",
//     bau3_sku: 987,
//     bau3_ship: "8,901,234",
//     bau3_value: "£89,012,345",
//   },
// ];

// const AGGridWithBreadcrumbs = () => {
//   const [breadcrumbs, setBreadcrumbs] = useState(["F22 Summary Data"]);
//   const [rowData, setRowData] = useState(initialData);

//   const columnDefs = useMemo(
//     () => [
//       {
//         field: "category, width:20",
//         headerName: "Category",
//         pinned: "left",
//         cellStyle: { fontWeight: 600 },
//       },
//       {
//         headerName: "BAU 1",
//         children: [
//           { field: "bau1_sku", headerName: "SKU Count" },
//           { field: "bau1_ship", headerName: "Shipment (EU)" },
//           { field: "bau1_value", headerName: "Net Value (GBP)" },
//         ],
//       },
//       {
//         headerName: "LTO",
//         children: [
//           { field: "bau2_sku", headerName: "SKU Count" },
//           { field: "bau2_ship", headerName: "Shipment (EU)" },
//           { field: "bau2_value", headerName: "Net Value (GBP)" },
//         ],
//       },
//       {
//         headerName: "CATEGORY TOTAL",
//         children: [
//           { field: "bau3_sku", headerName: "SKU Count" },
//           { field: "bau3_ship", headerName: "Shipment (EU)" },
//           { field: "bau3_value", headerName: "Net Value (GBP)" },
//         ],
//       },
//     ],
//     []
//   );

//   const onRowClicked = useCallback(
//     (event) => {
//       const category = event.data.category;
//       const newBreadcrumbs = [...breadcrumbs, category];
//       setBreadcrumbs(newBreadcrumbs);
//       setRowData(getChildData(category));
//     },
//     [breadcrumbs]
//   );

//   const onBreadcrumbClick = (index) => {
//     const newPath = breadcrumbs.slice(0, index + 1);
//     setBreadcrumbs(newPath);
//     if (index === 0) {
//       setRowData(initialData);
//     } else {
//       const name = newPath[newPath.length - 1];
//       setRowData(getChildData(name));
//     }
//   };

//   return (
//     <Box
//       sx={{
//         // padding: 3,
//         marginLeft: "4.5rem",
//         width: "93%",
//         backgroundColor: "#F1EFEC",
//       }}
//     >
//       <Paper elevation={4} sx={{ padding: "1rem", marginTop: "0.5rem" }}>
//         <Breadcrumbs
//           separator={<NavigateNextIcon fontSize="small" />}
//           sx={{ mb: 2 }}
//         >
//           {breadcrumbs.map((crumb, i) => (
//             <Link
//               key={i}
//               underline="hover"
//               color={i === breadcrumbs.length - 1 ? "text.primary" : "inherit"}
//               onClick={() => onBreadcrumbClick(i)}
//               sx={{ cursor: "pointer" }}
//             >
//               {crumb}
//             </Link>
//           ))}
//         </Breadcrumbs>
//       </Paper>

//       <Typography variant="h5" gutterBottom>
//         {breadcrumbs[breadcrumbs.length - 1]}
//       </Typography>

//       <Paper sx={{ height: 300 }} className="ag-theme-alpine">
//         <AgGridReact
//           rowData={rowData}
//           columnDefs={columnDefs}
//           defaultColDef={{ resizable: true, sortable: true, filter: true }}
//           onRowClicked={onRowClicked}
//           animateRows
//         />
//       </Paper>
//     </Box>
//   );
// };

// export default AGGridWithBreadcrumbs;

import React, { useState } from "react";
import { Box, Breadcrumbs, Link, Paper, Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const initialRowData = [
  {
    category: "Scotch",
    skuCount1: 1494,
    shipment1: "38,368,129",
    netValue1: "£2,222,458,596",
    skuCount2: 673,
    shipment2: "1,555,572",
    netValue2: "£119,128,711",
    skuCount3: 2167,
    shipment3: "39,923,701",
    netValue3: "£2,341,587,308",
  },
  {
    category: "Europe Spirits",
    skuCount1: 979,
    shipment1: "27,502,623",
    netValue1: "£903,768,933",
    skuCount2: 2,
    shipment2: "1",
    netValue2: "£19,799,894",
    skuCount3: 1000,
    shipment3: "27,793,792",
    netValue3: "£923,568,827",
  },
  {
    category: "Beer",
    skuCount1: 369,
    shipment1: "7,337,073",
    netValue1: "£0",
    skuCount2: 4,
    shipment2: "1",
    netValue2: "£0",
    skuCount3: 410,
    shipment3: "7,937,014",
    netValue3: "£0",
  },
  {
    category: "Baileys",
    skuCount1: 201,
    shipment1: "9,485,459",
    netValue1: "£450,064,197",
    skuCount2: 3,
    shipment2: "6",
    netValue2: "£34,662,947",
    skuCount3: 237,
    shipment3: "10,120,874",
    netValue3: "£484,727,144",
  },
  {
    category: "Tequila",
    skuCount1: 3,
    shipment1: "2",
    netValue1: "£18,030,003",
    skuCount2: 2,
    shipment2: "560",
    netValue2: "£339,686",
    skuCount3: 3,
    shipment3: "4",
    netValue3: "£18,369,689",
  },
  {
    category: "F22 Grand Total",
    skuCount1: 3075,
    shipment1: "9,561,612",
    netValue1: "£468,094,200",
    skuCount2: 773,
    shipment2: "3,082,656",
    netValue2: "£173,931,238",
    skuCount3: 3848,
    shipment3: "85,852,094",
    netValue3: "£3,768,252,968",
  },
];

const scotchLTOData = [
  {
    rank: 1,
    filter: true,
    brand: "Johnnie Walker",
    vol: 1437563,
    volPct: "92%",
    nv: "£85,814,558",
    nvPct: "72%",
  },
  {
    rank: 2,
    filter: true,
    brand: "The Singleton",
    vol: 45877,
    volPct: "3%",
    nv: "£9,610,669",
    nvPct: "8%",
  },
  {
    rank: 3,
    filter: true,
    brand: "Lagavulin",
    vol: 18599,
    volPct: "1%",
    nv: "£5,116,827",
    nvPct: "4%",
  },
  {
    rank: 4,
    filter: true,
    brand: "Cardhu",
    vol: 16201,
    volPct: "1%",
    nv: "£1,847,734",
    nvPct: "2%",
  },
  {
    rank: 5,
    filter: true,
    brand: "Talisker",
    vol: 13822,
    volPct: "1%",
    nv: "£4,885,554",
    nvPct: "4%",
  },
  {
    rank: 6,
    filter: true,
    brand: "Oban",
    vol: 8458,
    volPct: "1%",
    nv: "£2,910,120",
    nvPct: "2%",
  },
  {
    rank: 7,
    filter: true,
    brand: "Haig",
    vol: 7239,
    volPct: "0%",
    nv: "£239,759",
    nvPct: "0%",
  },
  {
    rank: 8,
    filter: true,
    brand: "Mortlach",
    vol: 2724,
    volPct: "0%",
    nv: "£1,517,017",
    nvPct: "1%",
  },
  {
    rank: 9,
    filter: true,
    brand: "Orphan Barrel",
    vol: 2502,
    volPct: "0%",
    nv: "£1,615,136",
    nvPct: "1%",
  },
  {
    rank: 10,
    filter: true,
    brand: "Royal Lochnagar",
    vol: 1102,
    volPct: "0%",
    nv: "£796,468",
    nvPct: "1%",
  },
  {
    rank: 11,
    filter: true,
    brand: "Casks of Distinction",
    vol: 594,
    volPct: "0%",
    nv: "£1,941,264",
    nvPct: "2%",
  },
  {
    rank: 12,
    filter: true,
    brand: "Caol Ila",
    vol: 194,
    volPct: "0%",
    nv: "£153,858",
    nvPct: "0%",
  },
  {
    rank: 13,
    filter: true,
    brand: "Inchgower",
    vol: 136,
    volPct: "0%",
    nv: "£113,539",
    nvPct: "0%",
  },
  {
    rank: 14,
    filter: true,
    brand: "Teaninich",
    vol: 105,
    volPct: "0%",
    nv: "£38,949",
    nvPct: "0%",
  },
  {
    rank: 15,
    filter: true,
    brand: "Cladach",
    vol: 85,
    volPct: "0%",
    nv: "£21,123",
    nvPct: "0%",
  },
  {
    rank: 16,
    filter: true,
    brand: "Clynelish",
    vol: 78,
    volPct: "0%",
    nv: "£53,201",
    nvPct: "0%",
  },
  {
    rank: 17,
    filter: true,
    brand: "Brora",
    vol: 61,
    volPct: "0%",
    nv: "£1,711,880",
    nvPct: "1%",
  },
  {
    rank: 18,
    filter: true,
    brand: "Dalwhinnie",
    vol: 43,
    volPct: "0%",
    nv: "£12,018",
    nvPct: "0%",
  },
  {
    rank: 19,
    filter: true,
    brand: "Pittyvaich",
    vol: 35,
    volPct: "0%",
    nv: "£15,823",
    nvPct: "0%",
  },
  {
    rank: 20,
    filter: true,
    brand: "Linkwood",
    vol: 35,
    volPct: "0%",
    nv: "£120,156",
    nvPct: "0%",
  },
  {
    rank: 21,
    filter: true,
    brand: "Convalmore",
    vol: 30,
    volPct: "0%",
    nv: "£225,716",
    nvPct: "0%",
  },
  {
    rank: 22,
    filter: true,
    brand: "Cragganmore",
    vol: 28,
    volPct: "0%",
    nv: "£81,338",
    nvPct: "0%",
  },
  {
    rank: 23,
    filter: true,
    brand: "Port Ellen",
    vol: 22,
    volPct: "0%",
    nv: "£63,214",
    nvPct: "0%",
  },
  {
    rank: 24,
    filter: true,
    brand: "Auchroisk",
    vol: 19,
    volPct: "0%",
    nv: "£207,915",
    nvPct: "0%",
  },
  {
    rank: 25,
    filter: true,
    brand: "Johnnie Walker - Princes Street",
    vol: 12,
    volPct: "0%",
    nv: "£464",
    nvPct: "0%",
  },
  {
    rank: 26,
    filter: true,
    brand: "Mannochmore",
    vol: 7,
    volPct: "0%",
    nv: "£13,067",
    nvPct: "0%",
  },
  {
    rank: 27,
    filter: true,
    brand: "Cameron Brig",
    vol: 4,
    volPct: "0%",
    nv: "£1,344",
    nvPct: "0%",
  },
  {
    rank: "Grand Total",
    filter: true,
    brand: "",
    vol: 1555572,
    volPct: "",
    nv: "£119,128,711",
    nvPct: "",
  },
];

const AGGridWithBreadcrumbs = () => {
  const [breadcrumbs, setBreadcrumbs] = useState(["F22 Summary Data"]);
  const [rowData, setRowData] = useState(initialRowData);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Category",
      field: "category",
      pinned: "left",
      cellStyle: { fontWeight: "bold" },
    },
    {
      headerName: "BAU",
      children: [
        { headerName: "SKU Count", field: "skuCount1" },
        { headerName: "Shipment (EU)", field: "shipment1" },
        { headerName: "Net Value (GBP)", field: "netValue1" },
      ],
    },
    {
      headerName: "LTO",
      children: [
        { headerName: "SKU Count", field: "skuCount2" },
        { headerName: "Shipment (EU)", field: "shipment2" },
        { headerName: "Net Value (GBP)", field: "netValue2" },
      ],
    },
    {
      headerName: "Category Total",
      children: [
        { headerName: "SKU Count", field: "skuCount3" },
        { headerName: "Shipment (EU)", field: "shipment3" },
        { headerName: "Net Value (GBP)", field: "netValue3" },
      ],
    },
  ]);

  const handleRowClick = (event) => {
    if (event.data.category === "Scotch") {
      setBreadcrumbs([...breadcrumbs, "Scotch"]);
      setColumnDefs([
        { headerName: "Rank", field: "rank" },
        { headerName: "Brand", field: "brand" },
        { headerName: "LTO Vol (EU)", field: "vol" },
        { headerName: "% of Tot LTO Vol", field: "volPct" },
        { headerName: "LTO NV (GBP)", field: "nv" },
        { headerName: "% of Tot LTO NV", field: "nvPct" },
      ]);
      setRowData(scotchLTOData);
    }
  };

  const handleBreadcrumbClick = (index) => {
    if (index === 0) {
      setBreadcrumbs(["F22 Summary Data"]);
      setColumnDefs([
        {
          headerName: "Category",
          field: "category",
          pinned: "left",
          cellStyle: { fontWeight: "bold" },
        },
        {
          headerName: "BAU",
          children: [
            { headerName: "SKU Count", field: "skuCount1" },
            { headerName: "Shipment (EU)", field: "shipment1" },
            { headerName: "Net Value (GBP)", field: "netValue1" },
          ],
        },
        {
          headerName: "LTO",
          children: [
            { headerName: "SKU Count", field: "skuCount2" },
            { headerName: "Shipment (EU)", field: "shipment2" },
            { headerName: "Net Value (GBP)", field: "netValue2" },
          ],
        },
        {
          headerName: "Category Total",
          children: [
            { headerName: "SKU Count", field: "skuCount3" },
            { headerName: "Shipment (EU)", field: "shipment3" },
            { headerName: "Net Value (GBP)", field: "netValue3" },
          ],
        },
      ]);
      setRowData(initialRowData);
    }
  };

  // Function to apply background color to group headers
  const getGroupRowStyle = (params) => {
    const groupHeader = params.node.group;
    if (groupHeader) {
      const headerName = params.node.key;
      // Apply different background colors for different group headers
      switch (headerName) {
        case "BAU":
          return { backgroundColor: "#f0f8ff" }; // Light blue for BAU
        case "LTO":
          return { backgroundColor: "#e0f7fa" }; // Light cyan for LTO
        case "Category Total":
          return { backgroundColor: "#ffe0b2" }; // Light orange for Category Total
        default:
          return { backgroundColor: "#fff" }; // Default background
      }
    }
    return null; // No custom style for non-group rows
  };

  return (
    <Box sx={{ padding: 1, marginLeft: "4.5rem" }}>
      <Paper elevation={4} sx={{ padding: "1rem" }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          {breadcrumbs.map((crumb, index) => (
            <Link
              key={index}
              underline="hover"
              color={
                index === breadcrumbs.length - 1 ? "text.primary" : "inherit"
              }
              sx={{ cursor: "pointer" }}
              onClick={() => handleBreadcrumbClick(index)}
            >
              {crumb}
            </Link>
          ))}
        </Breadcrumbs>
      </Paper>

      {/* <Typography variant="h5" gutterBottom>
        {breadcrumbs[breadcrumbs.length - 1]}
      </Typography> */}

      <div
        className="ag-theme-alpine"
        style={{ height: 480, width: "100%", marginTop: 16 }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onRowClicked={handleRowClick}
          animateRows={true}
          getRowStyle={getGroupRowStyle}
        />
      </div>
    </Box>
  );
};

export default AGGridWithBreadcrumbs;
