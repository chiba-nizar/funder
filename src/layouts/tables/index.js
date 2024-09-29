import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material"; // Import Material-UI components

const governorates = [
  "Ariana",
  "Tunis",
  "Bizerte",
  "Sfax",
  "Nabeul",
  "Monastir",
  "Kef",
  "Kairouan",
]; // Your governorates

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const [selectedGouvernorat, setSelectedGouvernorat] = useState(""); // Default to "" for "None"

  const handleGovernorateChange = (event) => {
    setSelectedGouvernorat(event.target.value);
  };

  const filteredRows = selectedGouvernorat
    ? rows.filter(
        (row) => row.Gouvernorat.props.children.toLowerCase() === selectedGouvernorat.toLowerCase()
      )
    : rows;

  const filteredPRows = selectedGouvernorat
    ? pRows.filter(
        (row) => row.Gouvernorat.props.children.toLowerCase() === selectedGouvernorat.toLowerCase()
      )
    : pRows;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mx={2} mb={3}>
          <FormControl fullWidth variant="outlined" size="medium">
            <Select
              labelId="gouvernorat-select-label"
              value={selectedGouvernorat}
              onChange={handleGovernorateChange}
              displayEmpty
              sx={{
                "&.MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.23)", // Adjust border color
                  },
                  "&:hover fieldset": {
                    borderColor: "blue", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "blue", // Border color when focused
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>Clear Filter</em>
              </MenuItem>
              {governorates.map((gov) => (
                <MenuItem key={gov} value={gov}>
                  {gov}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MDBox>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Stats Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows: filteredRows }} // Use filtered rows
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Holidays Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: filteredPRows }} // Use filtered rows for holidays
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
