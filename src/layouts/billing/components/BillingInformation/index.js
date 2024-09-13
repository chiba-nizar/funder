import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Bill from "layouts/billing/components/Bill";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";

function BillingInformation() {
  const [data, setData] = useState([]);

  // Fetch data from API on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/data/allData");
      const result = response.data;
      if (result.success) {
        setData(result.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle delete operation
  const handleDelete = (colis) => {
    setData((prevData) => prevData.filter((item) => item.colis !== colis));
  };

  return (
    <Card id="billing-information">
      <MDBox pt={3} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Data Information
        </MDTypography>
        <MDButton variant="outlined" color="primary" onClick={fetchData}>
          <Icon>refresh</Icon>&nbsp;Refresh
        </MDButton>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {data.map((item, index) => (
            <Bill
              key={index}
              name={item.nomDestinataire}
              company={item.colis} // Pass the required props
              email={item.tel1}
              vat={item.statut}
              colis={item.colis} // Pass colis for delete functionality
              onDelete={handleDelete} // Pass the delete handler
            />
          ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default BillingInformation;
