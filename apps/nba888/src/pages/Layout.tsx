import { Box } from "@mui/material";
import {useContext} from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Menubar from "../components/Menubar";
import UserContext from "../App"
const Layout = () => {
  const playerName = useContext(UserContext);
  return (
    <Box sx={{display:"flex",flexDirection:"column",position:"relative"}}>
      <Navbar />
      <Menubar/>
      <Outlet />
    </Box>
  );
};

export default Layout;
