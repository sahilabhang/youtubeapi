import React from "react";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { Link } from "react-router-dom";

export default function DashboardMUI() {
  const [value, setValue] = React.useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Link
          to="/search"
          onClick={() => handleChange(0)}
          style={{ textDecoration: "none" }}
        >
          <Tab label="Search" />
        </Link>
        <Link
          to="/favourites"
          onClick={() => handleChange(1)}
          style={{ textDecoration: "none" }}
        >
          <Tab label="Favourites" />
        </Link>
        <Link
          to="/stats"
          onClick={() => handleChange(2)}
          style={{ textDecoration: "none" }}
        >
          <Tab label="Statistics" />
        </Link>
      </Tabs>
    </Box>
  );
}
