import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <Box sx={{display:"flex",flexDirection:"column"}}>
      <Navbar />
      <Outlet />
    </Box>
  );
};

export default Layout;
