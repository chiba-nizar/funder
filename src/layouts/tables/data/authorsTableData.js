/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from "react";
import axios from "axios";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export default function DataTable() {
  const [stats, setStats] = useState([]);

  // Fetch data from API when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/data/getAllStats")
      .then((response) => {
        if (response.data.success) {
          setStats(response.data.Stats);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Creating the rows dynamically based on the response data
  const rows = stats.map((stat) => ({
    Gouvernorat: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Gouvernorat}
      </MDTypography>
    ),
    Nombre_total_de_colis: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Nombre_total_de_colis}
      </MDTypography>
    ),
    Somme_de_Cr_apres_remise: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Somme_de_Cr_apres_remise}
      </MDTypography>
    ),
    Nombre_de_Colis_Livrés: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Nombre_de_Colis_Livrés}
      </MDTypography>
    ),
    Somme_de_Cr_apres_remise_des_colis_livrés: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Somme_de_Cr_apres_remise_des_colis_livrés}
      </MDTypography>
    ),
    Nombre_de_Colis_Retournés: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Nombre_de_Colis_Retournés}
      </MDTypography>
    ),
    Somme_de_Cr_apres_remise_des_colis_retournés: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Somme_de_Cr_apres_remise_des_colis_retournés}
      </MDTypography>
    ),
    Nombre_de_Colis_Non_confirmés: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Nombre_de_Colis_Non_confirmés}
      </MDTypography>
    ),
    Somme_de_Cr_apres_remise_des_colis_non_confirmés: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Somme_de_Cr_apres_remise_des_colis_non_confirmés}
      </MDTypography>
    ),
    Nombre_hommes: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Nombre_hommes}
      </MDTypography>
    ),
    Nombre_de_femmes: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Nombre_de_femmes}
      </MDTypography>
    ),
    Nombre_hommes_livrés: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Nombre_hommes_livrés}
      </MDTypography>
    ),
    Somme_de_Cr_apres_remise_pour_hommes_livrés: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Somme_de_Cr_apres_remise_pour_hommes_livrés}
      </MDTypography>
    ),
    Nombre_hommes_retournés: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Nombre_hommes_retournés}
      </MDTypography>
    ),
    Somme_de_Cr_apres_remise_pour_hommes_retournés: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Somme_de_Cr_apres_remise_pour_hommes_retournés}
      </MDTypography>
    ),
    Nombre_hommes_non_confirmés: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Nombre_hommes_non_confirmés}
      </MDTypography>
    ),
    Somme_de_Cr_apres_remise_pour_hommes_non_confirmés: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Somme_de_Cr_apres_remise_pour_hommes_non_confirmés}
      </MDTypography>
    ),
    Nombre_de_femmes_livrées: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Nombre_de_femmes_livrées}
      </MDTypography>
    ),
    Somme_de_Cr_apres_remise_pour_femmes_livrées: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Somme_de_Cr_apres_remise_pour_femmes_livrées}
      </MDTypography>
    ),
    Nombre_de_femmes_retournées: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Nombre_de_femmes_retournées}
      </MDTypography>
    ),
    Somme_de_Cr_apres_remise_pour_femmes_retournées: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Somme_de_Cr_apres_remise_pour_femmes_retournées}
      </MDTypography>
    ),
    Nombre_de_femmes_non_confirmées: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Nombre_de_femmes_non_confirmées}
      </MDTypography>
    ),
    Somme_de_Cr_apres_remise_pour_femmes_non_confirmées: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {stat.Somme_de_Cr_apres_remise_pour_femmes_non_confirmées}
      </MDTypography>
    ),
  }));

  return {
    columns: [
      { Header: "Gouvernorat", accessor: "Gouvernorat", width: "20%", align: "left" },
      { Header: "Total Colis", accessor: "Nombre_total_de_colis", align: "center" },
      { Header: "Cr après remise", accessor: "Somme_de_Cr_apres_remise", align: "center" },
      { Header: "Colis Livrés", accessor: "Nombre_de_Colis_Livrés", align: "center" },
      {
        Header: "Cr Livrés",
        accessor: "Somme_de_Cr_apres_remise_des_colis_livrés",
        align: "center",
      },
      { Header: "Colis Retournés", accessor: "Nombre_de_Colis_Retournés", align: "center" },
      {
        Header: "Cr Retournés",
        accessor: "Somme_de_Cr_apres_remise_des_colis_retournés",
        align: "center",
      },
      { Header: "Colis Non Confirmés", accessor: "Nombre_de_Colis_Non_confirmés", align: "center" },
      {
        Header: "Cr Non Confirmés",
        accessor: "Somme_de_Cr_apres_remise_des_colis_non_confirmés",
        align: "center",
      },
      { Header: "Nombre Hommes", accessor: "Nombre_hommes", align: "center" },
      { Header: "Nombre Femmes", accessor: "Nombre_de_femmes", align: "center" },
      { Header: "Hommes Livrés", accessor: "Nombre_hommes_livrés", align: "center" },
      {
        Header: "Cr Hommes Livrés",
        accessor: "Somme_de_Cr_apres_remise_pour_hommes_livrés",
        align: "center",
      },
      { Header: "Hommes Retournés", accessor: "Nombre_hommes_retournés", align: "center" },
      {
        Header: "Cr Hommes Retournés",
        accessor: "Somme_de_Cr_apres_remise_pour_hommes_retournés",
        align: "center",
      },
      { Header: "Hommes Non Confirmés", accessor: "Nombre_hommes_non_confirmés", align: "center" },
      {
        Header: "Cr Hommes Non Confirmés",
        accessor: "Somme_de_Cr_apres_remise_pour_hommes_non_confirmés",
        align: "center",
      },
      { Header: "Femmes Livrées", accessor: "Nombre_de_femmes_livrées", align: "center" },
      {
        Header: "Cr Femmes Livrées",
        accessor: "Somme_de_Cr_apres_remise_pour_femmes_livrées",
        align: "center",
      },
      { Header: "Femmes Retournées", accessor: "Nombre_de_femmes_retournées", align: "center" },
      {
        Header: "Cr Femmes Retournées",
        accessor: "Somme_de_Cr_apres_remise_pour_femmes_retournées",
        align: "center",
      },
      {
        Header: "Femmes Non Confirmées",
        accessor: "Nombre_de_femmes_non_confirmées",
        align: "center",
      },
      {
        Header: "Cr Femmes Non Confirmées",
        accessor: "Somme_de_Cr_apres_remise_pour_femmes_non_confirmées",
        align: "center",
      },
    ],
    rows,
  };
}
