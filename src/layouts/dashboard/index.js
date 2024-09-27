import React, { useEffect } from "react";
import { Helmet } from "react-helmet"; // Import Helmet
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid";

function Dashboard() {
  useEffect(() => {
    // Function to initialize the map
    const initializeMap = () => {
      // Assuming WorldMap is the global constructor from worldmap.js
      if (typeof window.WorldMap === "function") {
        new window.WorldMap("map", {
          // Add any configuration options for your map if needed
        });
      } else {
        console.error("WorldMap function is not defined.");
      }
    };

    // Initialize the map after the scripts have loaded
    const mapDataScript = document.createElement("script");
    mapDataScript.src = "http://localhost:3000/map/mapdata.js"; // Update URL
    mapDataScript.async = true;

    const worldMapScript = document.createElement("script");
    worldMapScript.src = "http://localhost:3000/map/worldmap.js"; // Update URL
    worldMapScript.async = true;

    // Chain script loading
    mapDataScript.onload = () => {
      document.body.appendChild(worldMapScript);
      worldMapScript.onload = initializeMap; // Initialize map after worldmap.js loads
    };

    // Append the mapdata script first
    document.body.appendChild(mapDataScript);

    // Cleanup function to remove scripts when the component unmounts
    return () => {
      document.body.removeChild(mapDataScript);
      document.body.removeChild(worldMapScript);
    };
  }, []);

  return (
    <>
      <Helmet>
        <script type="text/javascript" src="http://localhost:3000/map/mapdata.js" />
        <script type="text/javascript" src="http://localhost:3000/map/worldmap.js" />
      </Helmet>
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
