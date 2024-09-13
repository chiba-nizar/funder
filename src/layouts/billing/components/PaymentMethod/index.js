import React, { useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";

function PaymentMethod() {
  const [formData, setFormData] = useState({
    colis: "",
    nomDestinataire: "",
    tel1: "",
    tel2: "",
    genre: "",
    Gouvernorat: "",
    description: "",
    statut: "",
    dateCreation: "",
    crApresRemise: "",
  });

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const Gouvernorats = [
    "Ariana",
    "Beja",
    "Ben Arous",
    "Bizerte",
    "Gabès",
    "Gafsa",
    "Jendouba",
    "Kairouan",
    "Kasserine",
    "Kebili",
    "Kef",
    "Mahdia",
    "Manouba",
    "Medenine",
    "Monastir",
    "Nabeul",
    "Sfax",
    "Sidi Bouzid",
    "Siliana",
    "Sousse",
    "Tataouine",
    "Tozeur",
    "Tunis",
    "Zaghouan",
  ];

  const statuts = ["Retour", "Non confirmé", "Livré"];

  const [message, setMessage] = useState(""); // State to store success or error message
  const [success, setSuccess] = useState(null); // State to track if the request was successful

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update the handleSubmit function to use axios and ensure we pass null instead of undefined
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace empty strings with null for fields that are not filled
    const sanitizedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value === "" ? null : value])
    );

    try {
      const response = await axios.post(
        "http://localhost:3000/api/data/create/newData",
        sanitizedFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;

      if (result.success) {
        setMessage(result.message); // Show success message
        setSuccess(true); // Mark the request as successful
      } else {
        setMessage("Failed to create row.");
        setSuccess(false); // Mark the request as failed
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while creating data."); // Show error message
      setSuccess(false);
    }
  };

  return (
    <Card id="delete-account">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Form Apply
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Colis Input */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Colis"
                name="colis"
                value={formData.colis}
                onChange={handleChange}
              />
            </Grid>
            {/* Nom destinataire Input */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nom destinataire"
                name="nomDestinataire"
                value={formData.nomDestinataire}
                onChange={handleChange}
              />
            </Grid>
            {/* Tel 1 Input */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tel 1"
                name="tel1"
                value={formData.tel1}
                onChange={handleChange}
              />
            </Grid>
            {/* Tel 2 Input */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tel 2"
                name="tel2"
                value={formData.tel2}
                onChange={handleChange}
              />
            </Grid>
            {/* Genre Select */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Genre</InputLabel>
                <Select name="genre" value={formData.genre} onChange={handleChange}>
                  <MenuItem value="H">H</MenuItem>
                  <MenuItem value="F">F</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Gouvernorat Select */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Gouvernorat</InputLabel>
                <Select name="Gouvernorat" value={formData.Gouvernorat} onChange={handleChange}>
                  {Gouvernorats.map((gouv) => (
                    <MenuItem key={gouv} value={gouv}>
                      {gouv}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Description Input */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            {/* Statut Select */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Statut</InputLabel>
                <Select name="statut" value={formData.statut} onChange={handleChange}>
                  {statuts.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Date de création Input */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date de création"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                name="dateCreation"
                value={formData.dateCreation}
                onChange={handleChange}
              />
            </Grid>
            {/* Cr apres remise Input */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cr apres remise"
                name="crApresRemise"
                value={formData.crApresRemise}
                onChange={handleChange}
              />
            </Grid>
            {/* Submit Button */}
            <Grid item xs={12}>
              <MDButton variant="gradient" color="dark" type="submit" fullWidth>
                Submit
              </MDButton>
            </Grid>
            {/* Display success or error message */}
            <Grid item xs={12}>
              {message && (
                <MDTypography
                  variant="h6"
                  color={success ? "success" : "error"}
                  fontWeight="medium"
                >
                  {message}
                </MDTypography>
              )}
            </Grid>
          </Grid>
        </form>
      </MDBox>
    </Card>
  );
}

export default PaymentMethod;
