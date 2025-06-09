import React from "react";
import SideMenu from "../SideMenuDrawer/SideMenu";
import AppTheme from "../../themes/shared-theme/AppTheme";
import { chartsCustomizations } from "../../themes/theme/customizations/charts.jsx";
import { dataGridCustomizations } from "../../themes/theme/customizations/dataGrid";
import { treeViewCustomizations } from "../../themes/theme/customizations/treeView.jsx";
import {
  CssBaseline,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Grid,
  styled,
} from "@mui/material";

export const TitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(0),
  border: "2px solid rgb(2, 28, 81)",
  p: 3,
  borderRadius: "5px",
  fontWeight: 600,
  fontSize: "24px",
  fontFamily: "Poppins, sans-serif",
  textTransform: "uppercase",
}));

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
        <Box p={2} display={"flex"} flexDirection={"column"} gap={2}>
          <TitleContainer
            sx={{
              display: "flex",
              border: "2px solid rgb(2, 28, 81)",
              p: 1,
              mb: 0,
              borderRadius: "5px",
              fontWeight: 600,
              fontSize: "28px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            LTO Opportunity – Supply (COGS & Liquid)
          </TitleContainer>

          <Box
            container
            spacing={2}
            sx={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}
          >
            {/* Main COGS Table */}
            <Box item xs={12} md={5} sx={{ height: "100%" }}>
              <TableContainer component={Paper} variant="outlined">
                <Table size="medium" sx={{ borderCollapse: "collapse" }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#021C51" }}>
                      <TableCell
                        rowSpan={2}
                        sx={{
                          color: "#fff",
                          fontWeight: "bold",
                          border: "1px solid #ccc",
                        }}
                      >
                        LTO Cost Components (£/EU)
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={2}
                        sx={{
                          color: "#fff",
                          fontWeight: "bold",
                          border: "1px solid #ccc",
                          background: "#3674B5",
                          fontSize: "18px",
                          letterSpacing: "1px",
                        }}
                      >
                        Brazil
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={2}
                        sx={{
                          color: "#fff",
                          fontWeight: "bold",
                          border: "1px solid #ccc",
                          background: "#3674B5",
                          fontSize: "18px",
                          letterSpacing: "1px",
                        }}
                      >
                        India
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ backgroundColor: "#021C51" }}>
                      <TableCell
                        sx={{
                          color: "#fff",
                          fontWeight: "bold",
                          // background: "#3674B5",
                        }}
                      >
                        Included in G5 P&amp;L
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#fff",
                          fontWeight: "bold",
                          border: "1px solid #ccc",
                          // background: "#3674B5",
                        }}
                      >
                        Excluded in G5 P&amp;L
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#fff",
                          fontWeight: "bold",
                          border: "1px solid #ccc",
                          // background: "#3674B5",
                        }}
                      >
                        Included in G5 P&amp;L
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#fff",
                          fontWeight: "bold",
                          // background: "#3674B5",
                        }}
                      >
                        Excluded in G5 P&amp;L
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      ["SKU Cost", "£17.97", "", "£17.21", "£0.53"],
                      ["Origination Costs", "£1.81", "", "", ""],
                      ["Local Costs", "£0.00", "£0.00", "", ""],
                      ["Write Offs", "£0.034", "", "", ""],
                      ["Supply Campaign O/H", "£0.157", "", "", "£0.260"],
                      ["Total COGS", "£19.96", "", "£18.03", ""],
                      ["Mkt LTO (A&P)", "£10.00", "", "", ""],
                      ["GBT (A&P Global)", "", "", "", ""],
                      ["Total A&P", "£10.00", "", "£0.00", ""],
                    ].map((row, idx) => (
                      <TableRow key={idx}>
                        {row.map((cell, i) => (
                          <TableCell
                            key={i}
                            sx={{
                              fontWeight: "600",
                              border: "1px solid #ccc",
                              textAlign: i > 0 ? "center" : "left",
                            }}
                          >
                            {cell}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Side Summary Boxes */}
            <Box item xs={12} md={5}>
              <Box display="flex" flexDirection="column" gap={1.3}>
                <Paper variant="outlined" sx={{ p: 2, borderColor: "#3674B5" }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    G5 P&L Excluded Cost Impact
                  </Typography>

                  <Table size="small" sx={{ borderCollapse: "collapse" }}>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ border: "1px solid #ccc" }}>
                          Residual Vol (EU)
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ccc" }}>
                          39,447
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ccc" }}>
                          87,570
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ border: "1px solid #ccc" }}>
                          Excess Costs vs COGS
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ccc" }}>
                          £2.00
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ccc" }}>
                          £0.82
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ border: "1px solid #ccc" }}>
                          Total Excluded Cost
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ccc" }}>
                          £78,853
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ccc" }}>
                          £72,065
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>
                          <strong>Grand Total</strong>
                        </TableCell>
                        <TableCell>
                          <strong>£150,917</strong>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Typography
                    mt={1}
                    fontSize="0.875rem"
                    bgcolor="#90EE90"
                    fontFamily={"Inter, sans-serif"}
                    fontWeight={"bold"}
                    p={2}
                  >
                    Extrapolated Excess Cost for F22 Scotch Vol:{" "}
                    <strong>£740,452</strong>
                  </Typography>
                </Paper>

                <Paper variant="outlined" sx={{ p: 2, borderColor: "#3674B5" }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Opportunity Cost (BAU vs LTO)
                  </Typography>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ border: "1px solid #ccc" }}>
                          New LTO COGS – BAU COGS
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ccc" }}>
                          £5.63
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ccc" }}>
                          £1.38
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ border: "1px solid #ccc" }}>
                          Cost on Residual Vols
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ccc" }}>
                          £222,006
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ccc" }}>
                          £121,160
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>
                          <strong>Grand Total</strong>
                        </TableCell>
                        <TableCell>
                          <strong>£343,166</strong>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Typography
                    mt={1}
                    fontSize="0.875rem"
                    bgcolor="#90EE90"
                    fontFamily={"Inter, sans-serif"}
                    // letterSpacing={1}
                    fontWeight={"bold"}
                    p={2}
                  >
                    Extrapolated Opportunity Cost for F22 Scotch LTO Vol:{" "}
                    <strong>£1,680,018</strong>
                  </Typography>
                </Paper>

                <Paper variant="outlined" sx={{ p: 2, borderColor: "#3674B5" }}>
                  <Typography
                    fontSize="0.875rem"
                    bgcolor="#90EE90"
                    fontFamily={"Inter, sans-serif"}
                    // letterSpacing={1}
                    fontWeight={"bold"}
                    p={2}
                  >
                    Extrapolated F22 Scotch Liquid Opportunity (EU): 622,229
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </AppTheme>
  );
};

export default OpportunityPage;
