import { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making API requests

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types"; // Import PropTypes

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import breakpoints from "assets/theme/base/breakpoints";
import burceMars from "assets/images/bruce-mars.jpg"; // Default avatar image
import backgroundImage from "assets/images/bg-profile.jpeg";

function Header({ children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [userData, setUserData] = useState({
    full_name: "",
    email: "",
    avatar: burceMars, // Default avatar image
  });

  useEffect(() => {
    // A function to fetch the logged-in user's data
    const fetchUserData = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem("token");
        console.log("token", token);

        if (!token) {
          console.error("No token found");
          return;
        }

        // Set up the authorization header with the token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        console.log("config", config);
        // Make the API request to get the logged-in user's information
        const response = await axios.get("http://localhost:3000/api/user/me", config);

        // Update the state with the user data
        setUserData({
          full_name: response.data.user.full_name,
          email: response.data.user.email,
          avatar: response.data.user.avatar || burceMars, // Assuming you have avatar data
        });
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    // Fetch user data on component mount
    fetchUserData();

    // Function to handle tabs orientation (existing code)
    const handleTabsOrientation = () => {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    };

    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation(); // Call on initial load

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item></Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {userData.full_name}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                {userData.email}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}></Grid>
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
