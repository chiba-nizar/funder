import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios"; // Import axios for API requests

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import funderIcon from "assets/images/funder.png"; // Ensure the correct path to your image

function Basic() {
  const baseUrl = process.env.REACT_APP_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null); // Error message
  const [successMessage, setSuccessMessage] = useState(null); // Success message
  const navigate = useNavigate(); // Hook for navigation

  const url = `${baseUrl}authentication/sign-in`;

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(url, { email, password });

      if (res.data.success) {
        setSuccessMessage(res.data.message); // Set the success message from response
        setError(null); // Clear any previous error message

        // Redirect to the /tables page after 2 seconds
        setTimeout(() => {
          navigate("/tables");
        }, 2000); // 2-second delay before redirecting
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Error signing in. Please try again.");
      console.error(err);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={12} display="flex" justifyContent="center">
              <img
                src={funderIcon} // Correct image reference without quotes
                alt="Funder logo"
                style={{ width: "100px", height: "auto" }}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state with input value
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state with input value
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>

            {/* Error message display */}
            {error && (
              <MDBox mt={2} mb={1}>
                <MDTypography variant="button" color="error" fontWeight="bold">
                  {error}
                </MDTypography>
              </MDBox>
            )}

            {/* Success message display */}
            {successMessage && (
              <MDBox mt={2} mb={1}>
                <MDTypography variant="button" color="success" fontWeight="bold">
                  {successMessage}
                </MDTypography>
              </MDBox>
            )}

            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                Sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
