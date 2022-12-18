import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Grid } from "@mui/material";
import {
  Button,
  styled,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
} from "@mui/material";


const StyledToolbar = styled(Toolbar)({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
});

const CustomButtonOutlined = styled(Button)(({ theme }) => ({
  color: "#808080",
  fontSize: "16px",
  border: "2px solid #FFD372",
  borderRadius: "10px",
  padding: "10px 20px",
  boxShadow:"none",
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "white",
    color: "#36454F",
    boxShadow:"none",
    backgroundColor:"rgba(255, 211, 114,0.05)"
  },
}));

const CustomButtonContained = styled(Button)(({ theme }) => ({
  color: "#36454F",
  fontSize: "16px",
  border: "2px solid #FFD372",
  borderRadius: "10px",
  padding: "10px 20px",
  boxShadow:"none",
  backgroundColor: "rgba(255, 211, 114,0.25)",
  "&:hover": {
    backgroundColor: "white",
    border:"2px solid #FFD372",
    color: "#36454F",
    boxShadow:"none",
    backgroundColor:"rgba(255, 211, 114,0.05)"
  },
}));

function QuizzCard() {
  let navigate = useNavigate()
  return (
    <>
      <CssBaseline />
      <Grid
        sx={{
          flexGrow: 1,
          marginTop: 1,
        }}
        container
        spacing={0}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="start"
          spacing="2rem"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              height: "100%",
              flexWrap: "wrap",
              alignContent: "center",
            }}
          >
            <Grid item>
              <Card
                sx={{ maxWidth: {xl:500,lg:400}, borderRadius: "16px", height: "32rem" }}
              >
                <CardMedia
                  component="img"
                  alt="tbate"
                  height="140"
                
                  image="https://phantom-marca.unidadeditorial.es/ee46d7a1c09b447117f8e83c6e131f31/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/02/16437899001758.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    เกมตอบคำถามวัดความรู้เกี่ยวกับ NBA ของคุณ
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ในเกมนี้เราจะให้ผู้ใช้งานได้ทำการเล่นเกมตอบคำถาม
                    ที่มีความเกี่ยวข้องกับกีฬาการแข่งขัน NBA
                    โดยจะมีการแบ่งออกเป็น
                    ระดับความยากที่แตกต่างกันตั้งแต่ระดับง่ายสุดไปจนถึงระดับแฟนตัวยง
                    มาวัดความรู้ NBA ของคุณกันนน!!!
                  </Typography>
                </CardContent>
                <StyledToolbar sx={{ width: "100%" }}>
                  <CardActions>
                      <CustomButtonOutlined variant="contained" size="medium" onClick={()=>{navigate("/Quiz1")}}>
                        เกมตอบคำถามวัดความรู้ NBA
                      </CustomButtonOutlined>
                  </CardActions>
                </StyledToolbar>
              </Card>
            </Grid>
            {/*
            <Grid item>
              <Card
                sx={{ maxWidth: {xl:500,lg:400}, borderRadius: "16px", height: "32rem" }}
              >
                <CardMedia
                  component="img"
                  alt="tbate"
                  height="140"
                
                  image="https://staticg.sportskeeda.com/editor/2017/12/e45ca-1513870886-800.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    ทดสอบ IQ ในการเล่นบาสของคุณ
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ในเกมนี้เราจะให้ผู้ใช้งานได้ทำการเล่นเกมตอบคำถาม
                    ที่มีความเกี่ยวข้องกับกีฬาการแข่งขัน NBA
                    โดยจะมีการแบ่งออกเป็น
                    ระดับความยากที่แตกต่างกันตั้งแต่ระดับง่ายสุดไปจนถึงระดับแฟนตัวยง
                    มาวัดความรู้ NBA ของคุณกันนน!!!
                  </Typography>
                </CardContent>
                <StyledToolbar sx={{ width: "100%" }}>
                  <CardActions>
                      <CustomButtonOutlined variant="contained" size="medium" onClick={()=>{navigate("/Quiz2")}}>
                        เกมตอบคำถามวัด IQ 
                      </CustomButtonOutlined>
                  </CardActions>
                </StyledToolbar>
              </Card>
            </Grid> */}
            <Grid item >
              <Card
                sx={{ maxWidth: {xl:500,lg:400}, borderRadius: "16px", height: "32rem" }}
              >
                <CardMedia
                  component="img"
                  alt="tbate"
                  height="140"
                  image="https://images.complex.com/complex/images/c_scale,f_auto,q_auto,w_1920/fl_lossy,pg_1/utgfcacoxl6hwd2bj2ay/10-most-influential-nba-players-2022-original-nonw?fimg-ssr-default"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    คุณมีสไตล์การเล่นบาสเหมือนนักกีฬา NBA คนใด?
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    แบบทดสอบที่จะทำให้คุณได้เรียนรู้เกี่ยวกับตัวคุณเองมากขึ้น
                    ว่าตัวคุณนั้นมีสไตล์การเล่นบาสเก็ตบอลคล้ายกับนักกีฬา NBA
                    คนใดจากทั้งในอตีตและปัจจุบัน
                  </Typography>
                </CardContent>
                <StyledToolbar sx={{ width: "100%" }}>
                  <CardActions>
                    
                      <CustomButtonContained variant="outlined" size="medium" onClick={()=>{navigate("/Quiz2")}}>
                        แบบทดสอบประเมินสไตล์การเล่น
                      </CustomButtonContained>
                  </CardActions>
                </StyledToolbar>
              </Card>
            </Grid>
            
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
export default QuizzCard;
