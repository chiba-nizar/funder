import React from "react";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";
import axios from "axios";

function Bill({ name, company, email, vat, noGutter, colis, onDelete }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/data/delete/${colis}`);
      if (onDelete) onDelete(colis); // Call the onDelete callback if provided
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {name}
          </MDTypography>

          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <MDBox mr={1}>
              <MDButton variant="text" color="error" onClick={handleDelete}>
                <Icon>delete</Icon>&nbsp;delete
              </MDButton>
            </MDBox>
            <MDButton variant="text" color={darkMode ? "white" : "dark"}>
              <Icon>edit</Icon>&nbsp;edit
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Numéro Colis:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {company}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Numéro Télephone:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {email}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDTypography variant="caption" color="text">
          Status:&nbsp;&nbsp;&nbsp;
          <MDTypography variant="caption" fontWeight="medium">
            {vat}
          </MDTypography>
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Bill.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  vat: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
  colis: PropTypes.string.isRequired, // Add colis as a required prop
  onDelete: PropTypes.func, // Add onDelete as a prop
};

export default Bill;
