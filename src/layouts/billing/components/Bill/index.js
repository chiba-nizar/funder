import React, { useState } from "react";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material"; // Import MUI Dialog components

function Bill({ name, company, email, vat, noGutter, colis, onDelete }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  // State to manage popup and form data
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    colis,
    nomDestinataire: name,
    tel1: email, // Assuming email corresponds to a phone number in this case
    tel2: "",
    genre: "",
    Gouvernorat: "",
    description: "",
    statut: vat,
    dateCreation: "",
    crApresRemise: "",
  });

  // Open popup for editing and fetch data
  const handleClickOpen = async () => {
    setOpen(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/data/getData/${colis}`);
      if (response.data && response.data.colis) {
        setFormData(response.data.colis); // Populate form with API response data
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Close popup
  const handleClose = () => {
    setOpen(false);
  };

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle delete request
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/data/delete/${colis}`);
      if (onDelete) onDelete(colis); // Call the onDelete callback if provided
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Handle form submission for update
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/data/update/${colis}`, formData);
      console.log(response.data);
      handleClose(); // Close popup on success
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <>
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

            <MDBox
              display="flex"
              alignItems="center"
              mt={{ xs: 2, sm: 0 }}
              ml={{ xs: -1.5, sm: 0 }}
            >
              <MDBox mr={1}>
                <MDButton variant="text" color="error" onClick={handleDelete}>
                  <Icon>delete</Icon>&nbsp;delete
                </MDButton>
              </MDBox>
              <MDButton
                variant="text"
                color={darkMode ? "white" : "dark"}
                onClick={handleClickOpen}
              >
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

      {/* Edit Popup */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Colis</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nom Destinataire"
            name="nomDestinataire"
            value={formData.nomDestinataire}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Tel1"
            name="tel1"
            value={formData.tel1}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Tel2"
            name="tel2"
            value={formData.tel2}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Gouvernorat"
            name="Gouvernorat"
            value={formData.Gouvernorat}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Statut"
            name="statut"
            value={formData.statut}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Date Creation"
            name="dateCreation"
            value={formData.dateCreation}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="CR Après Remise"
            name="crApresRemise"
            value={formData.crApresRemise}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
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
