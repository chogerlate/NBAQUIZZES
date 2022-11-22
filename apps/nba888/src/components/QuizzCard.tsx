import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Grid } from "@mui/material";
import {
  AppBar,
  Button,
  Drawer,
  styled,
  Toolbar,
  Typography,
  Box,
  Menu,
  CssBaseline,
} from "@mui/material";

import { Stack } from "@mui/system";
import { makeStyles } from "@mui/styles";

const StyledToolbar = styled(Toolbar)({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
});

function QuizzCard() {
  return (
    <>
      <CssBaseline />
      <Grid
        sx={{
          flexGrow: 1,
          marginTop: 5,
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
          <Grid item>
            <Card sx={{ maxWidth: 500 }}>
              <CardMedia
                component="img"
                alt="tbate"
                height="140"
                image="https://i.ytimg.com/vi/1wmZuSWbec0/maxresdefault.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <StyledToolbar sx={{ width: "100%" }}>
                <CardActions>
                  <Button variant="contained" size="medium">
                    Play Quizz1
                  </Button>
                </CardActions>
              </StyledToolbar>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ maxWidth: 500 }}>
              <CardMedia
                component="img"
                alt="tbate"
                height="140"
                image="https://i.ytimg.com/vi/1wmZuSWbec0/maxresdefault.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <StyledToolbar sx={{ width: "100%" }}>
                <CardActions>
                  <Button variant="outlined" size="medium">
                    Play Quizz2
                  </Button>
                </CardActions>
              </StyledToolbar>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
export default QuizzCard;
