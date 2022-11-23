import { useContext, useEffect, useState } from "react";
import {
    Button,
    styled,
    Typography,
    Box,
    Menu,
    Grid,
    TextField,
    InputBase,
    Dialog,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { ProfileAvatarStore } from "../components/AvatarStore";
import { makeStyles } from "@mui/styles";
import { UserContext } from "../App";
import axios from "axios";
import HomeIcon from '@mui/icons-material/Home';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";

const useStyles = makeStyles({
    container: {
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
        alignSelft: "center",
        backgroundColor: "white",
    },
    profileImage: {
        width: "150px",
        marginLeft: "auto",
        marginRight: "auto"
    }
});

const CustomButtonContained = styled(Button)(({ theme }) => ({
    color: "#36454F",
    fontSize: "20px",
    border: "2px solid #FFD372",
    borderRadius: "10px",
    padding: "10px 20px",
    boxShadow: "none",
    backgroundColor: "rgba(255, 211, 114,0.1)",
    "&:hover": {
        backgroundColor: "white",
        border: "2px solid #FFD372",
        color: "#36454F",
        boxShadow: "none",
        backgroundColor: "rgba(255, 211, 114,0.3)"
    },
}));


const QuizResult = () => {
    let navigate = useNavigate();
    const {
        playerName,
        setPlayerName,
        profileAvatarIndex,
        setProfileAvatarIndex,
        score,
        setScore,
        totalScore,
        setTotalScore,
    } = useContext(UserContext);
    useEffect(() => {
        if (!localStorage["playerName"]) {
            window.localStorage.setItem("playerName", "");
        }
        if (!localStorage["playerAvatar"]) {
            window.localStorage.setItem("playerAvatar", 0);
        } else {
            setPlayerName(window.localStorage.getItem("playerName"));
            setProfileAvatarIndex(window.localStorage.getItem("playerAvatar"));
        }
    }, []);
    const classes = useStyles();

    return (
        <Box sx={{ width: "100%" }}>
            <Grid
                container
                className={classes.container}
                sx={{
                    width: { xl: "60%", lg: "70%", md: "90%", sm: "90%", xs: "90%" },
                    padding: "20px",
                    borderRadius: "20px",
                    height: "100%",
                    position: "relative",
                    boxShadow: "white 0px 4px 8px",
                }}
            >

                <Grid item lg={12} sx={{ padding: "0 20px" }}>
                    <img src={ProfileAvatarStore[profileAvatarIndex].imageDirectory} className={classes.profileImage} />
                    <Typography
                        sx={{ fontSize: "30px", fontWeight: "600", textAlign: "center", marginTop: "10px" }}
                    >
                        คุณ {playerName} ได้รับคะแนน
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "80px",
                            fontWeight: "600",
                            textAlign: "center",
                            marginTop: "5px",
                            color: "#6F38C5",
                        }}
                    >
                        {score}
                    </Typography>
                    <Typography
                        sx={{ fontSize: "20px", fontWeight: "600", textAlign: "center" }}
                    >
                        จาก {totalScore} ข้อ
                    </Typography>
                    <Box sx={{ position: "relative" ,width:"80%",marginTop:"20px",height:"40px",marginLeft:"auto",marginRight:"auto"}}>
                        <Box sx={{
                            backgroundColor: "#65C18C", width: score != 0 ? `${(score / totalScore) * 100}%` : "0%", height: "40px", position: "absolute"
                            , left: "0", borderRadius: "5px", zIndex: "4", textAlign: "right"
                        }} id="score">
                            {score != 0 ? <Typography sx={{
                                marginTop: "8px"
                                , marginRight: "10px", color: "white", fontWeight: "600", top: "0"
                            }}>{(score / totalScore) * 100}%</Typography> : ""}
                        </Box>
                        <Box sx={{
                            backgroundColor: "#C7F2A4", width: "100%", height: "40px", position: "absolute"
                            , left: "0", borderRadius: "5px", zIndex: "3", top: "0"
                        }} id="RangeScore">
                        </Box>
                    </Box><Typography
                        sx={{ fontSize: "30px", fontWeight: "600", textAlign: "center", marginTop: "20px" }}
                    >
                       {((score / totalScore) * 100)<=50? "ลองทำอีกครั้งดูซิ!": "คุณก็เก่งเกิ้น"}
                    </Typography>
                </Grid>


                <Grid item lg={12} sx={{ textAlign: "center" ,marginTop:"10px"}}>
                    <Box
                        sx={{
                            alignItems: "center",
                        }}
                    >
                        <CustomButtonContained
                            style={{ padding: "1rem 2rem" }}
                            variant="contained"
                            onClick={() => {
                                setTotalScore(0);
                                setScore(0);
                                navigate("/Quiz1");
                            }}
                        >
                            <Box sx={{ display: "flex" }}>
                                <RestartAltIcon sx={{ marginRight: "10px", fontSize: "30px", color: "#00005C" }} />
                                <Typography sx={{ fontSize: "20px" }}>เล่นอีกครั้ง</Typography>
                            </Box>
                        </CustomButtonContained>
                        <CustomButtonContained
                            style={{ padding: "1rem 2rem", marginLeft: "20px" }}
                            variant="contained"
                            onClick={() => {
                                setTotalScore(0);
                                setScore(0);
                                navigate("/");
                            }}
                        >
                            <Box sx={{ display: "flex" }}>
                                <HomeIcon sx={{ marginRight: "10px", fontSize: "30px", color: "#600005C" }} />
                                <Typography sx={{ fontSize: "20px" }}>กลับหน้าหลัก</Typography>
                            </Box>
                        </CustomButtonContained>
                    </Box>
                </Grid>
            </Grid>
            {/*/Edit Profile Avatar Card*/}
        </Box>
    );
};

export default QuizResult;
