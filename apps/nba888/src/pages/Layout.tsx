import { Box } from "@mui/material";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UserContext } from "../App";

// import bgimg from "../../public/images/bgimg.png";

const Layout = () => {
  const playerName = useContext(UserContext);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
      style={{
        height: "100vh",
      }}
    >
      <Navbar />
      <Outlet />
    </Box>
  );
};

export default Layout;
