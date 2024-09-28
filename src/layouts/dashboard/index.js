import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid";

function Dashboard() {
  return (
    <>
      <DashboardLayout>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={12} lg={12}>
            <iframe
              title="Power BI Dashboard"
              src="https://app.powerbi.com/view?r=eyJrIjoiMTRiMDIzNzAtNGI3Mi00Nzg4LWJiMDItMTIwMmQ3MzNiYTdjIiwidCI6ImI3YmQ0NzE1LTQyMTctNDhjNy05MTllLTJlYTk3ZjU5MmZhNyJ9"
              width="800"
              height="450"
              frameBorder="0"
              allowFullScreen={true}
              style={{
                border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                borderRadius: "8px",
              }}
            />
            {/* Add your map div here */}
            <div id="map" style={{ width: "100%", height: "500px", marginTop: "20px" }}></div>
          </Grid>
        </Grid>
      </DashboardLayout>
    </>
  );
}

export default Dashboard;
