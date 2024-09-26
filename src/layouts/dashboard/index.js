import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function Dashboard() {
  return (
    <DashboardLayout>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={12} lg={12}>
          <iframe
            title="Power BI Dashboard"
            src="https://app.powerbi.com/view?r=eyJrIjoiMTRiMDIzNzAtNGI3Mi00Nzg4LWJiMDItMTIwMmQ3MzNiYTdjIiwidCI6ImI3YmQ0NzE1LTQyMTctNDhjNy05MTllLTJlYTk3ZjU5MmZhNyJ9"
            width="800" // Further reduced width
            height="450" // Further reduced height
            frameBorder="0" // No border
            allowFullScreen={true} // Allow full-screen mode
            style={{
              border: "none", // Remove border for a cleaner look
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)", // Optional: Add shadow for depth
              borderRadius: "8px", // Optional: Rounded corners
            }}
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Dashboard;
