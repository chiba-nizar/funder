/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Data() {
  const [holidays, setHolidays] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/data/getAllHollydays")
      .then((response) => {
        if (response.data.success) {
          setHolidays(response.data.hollydays);
        }
      })
      .catch((error) => {
        console.error("Error fetching holiday data:", error);
      });
  }, []);

  // Map the fetched data into table rows
  const rows = holidays.map((holiday) => ({
    Gouvernorat: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {holiday.Gouvernorat}
      </MDTypography>
    ),
    Black_Friday: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {holiday.Black_Friday}
      </MDTypography>
    ),
    Saint_Valentin: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {holiday.Saint_Valentin}
      </MDTypography>
    ),
    Soldes_Hiver: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {holiday.Soldes_Hiver}
      </MDTypography>
    ),
    Soldes_Été: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {holiday.Soldes_Été}
      </MDTypography>
    ),
    Mother_Day: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {holiday.Mother_Day}
      </MDTypography>
    ),
    Woman_Day: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {holiday.Woman_Day}
      </MDTypography>
    ),
    Father_Day: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {holiday.Father_Day}
      </MDTypography>
    ),
    Noël: (
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {holiday.Noël}
      </MDTypography>
    ),
  }));

  return {
    columns: [
      { Header: "Gouvernorat", accessor: "Gouvernorat", width: "20%", align: "left" },
      { Header: "Black Friday", accessor: "Black_Friday", align: "center" },
      { Header: "Saint Valentin", accessor: "Saint_Valentin", align: "center" },
      { Header: "Soldes Hiver", accessor: "Soldes_Hiver", align: "center" },
      { Header: "Soldes Été", accessor: "Soldes_Été", align: "center" },
      { Header: "Mother Day", accessor: "Mother_Day", align: "center" },
      { Header: "Woman Day", accessor: "Woman_Day", align: "center" },
      { Header: "Father Day", accessor: "Father_Day", align: "center" },
      { Header: "Noël", accessor: "Noël", align: "center" },
    ],
    rows,
  };
}
