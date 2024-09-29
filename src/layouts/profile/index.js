// @mui material components
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography"; // Import Typography for displaying text
import Card from "@mui/material/Card"; // Import Card component
import CardContent from "@mui/material/CardContent"; // Import CardContent
import CardActions from "@mui/material/CardActions"; // Import CardActions
import Button from "@mui/material/Button"; // Optional: Import Button for actions
import { useEffect, useState } from "react"; // Import useEffect and useState from React

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// Overview page components
import Header from "layouts/profile/components/Header";

function Overview() {
  const [users, setUsers] = useState([]); // State to hold user data
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user/getAll");
        const data = await response.json();
        if (data.success) {
          setUsers(data.user); // Set user data in state
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchUsers(); // Call the fetch function
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          {loading ? ( // Show loading text while data is being fetched
            <Typography variant="h6">Loading...</Typography>
          ) : (
            <Grid container spacing={2}>
              {users.map(
                (
                  user // Map through user data and display each user
                ) => (
                  <Grid item xs={12} sm={6} md={4} key={user.id}>
                    <Card variant="outlined">
                      {" "}
                      {/* Create a card for each user */}
                      <CardContent>
                        <Typography variant="h6">{user.full_name}</Typography>
                        <Typography variant="body2">{user.email}</Typography>
                      </CardContent>
                      <CardActions>
                        {/* Optional: Add buttons or actions here */}
                        <Button size="small" color="primary">
                          View Profile
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              )}
            </Grid>
          )}
        </MDBox>
      </Header>
    </DashboardLayout>
  );
}

export default Overview;
