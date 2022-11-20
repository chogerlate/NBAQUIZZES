import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import UserContext from "../App"

export default function Menubar(){
    const playerName = useContext(UserContext);
    return(
        <Box sx={{position:"absolute",top:"20px",right:"30px"}}>
            <Typography sx={{fontSize:"24px",fontWeight:"600",color:"white"}}>{playerName}</Typography>
        </Box>
    )
}