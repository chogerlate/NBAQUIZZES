import { Box, Typography } from "@mui/material";
import { useContext ,useEffect} from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UserContext } from "../App";

// import bgimg from "../../public/images/bgimg.png";

const Layout = () => {
  const {playerName}= useContext(UserContext);
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
      <Typography sx={{fontSize:"30px",position:"absolute",right:"30px",top:"20px",color:"white"}}>{playerName}</Typography>
      <Navbar />
      <Outlet />
    </Box>
  );
};

export default Layout;
