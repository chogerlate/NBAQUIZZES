import { Box, Typography, useScrollTrigger } from "@mui/material";
import { useContext ,useEffect, useState} from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UserContext } from "../App";
import Ads1 from "../assets/ads1.gif"
import Ads2 from "../assets/ads2.gif"
import HomeIcon from '@mui/icons-material/Home';
// import bgimg from "../../public/images/bgimg.png";

const Layout = () => {
  const {playerName}= useContext(UserContext);
  const [openAds1,setOpenAds1] = useState(true);
  const [openAds2,setOpenAds2] = useState(true);
  let navigate = useNavigate();
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
    
      {openAds1?<Box sx={{position:"absolute",top:"10px",left:"10px",zIndex:"5"}}>
        <Typography sx={{position:"absolute",right:"5px",fontSize:"20px",color:"red",cursor:"pointer"}}
        onClick={()=>{setOpenAds1(false)}}>X</Typography>
        <img src={Ads1}/>
      </Box>:""}
      {openAds2?<Box sx={{position:"absolute",top:"10px",right:"10px",zIndex:"5"}}>
      <Typography sx={{position:"absolute",right:"5px",fontSize:"20px",color:"red",cursor:"pointer"}}
      onClick={()=>{setOpenAds2(false)}}>X</Typography>
        <img src={Ads2}/>
      </Box>:""}
      
      <HomeIcon sx={{fontSize:"60px",position:"absolute",left:"30px",top:"20px",color:"white",cursor:"pointer",zIndex:openAds1?"":"5"}} 
      onClick={()=>{
        navigate("/");
      }}/>
      <Typography sx={{fontSize:"30px",position:"absolute",right:"30px",top:"20px",color:"white"}}>{playerName}</Typography>
      <Navbar />
      <Outlet />
    </Box>
  );
};

export default Layout;
