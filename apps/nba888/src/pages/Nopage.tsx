import { useNavigate } from "react-router-dom";
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
  Container,
  Stack,
  Paper,
} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  border: "0",
  boxShadow: "none",
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
}));

export default function Nopage() {
  let navigate = useNavigate();

  return (
    <>
      <Container maxWidth="md">
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            backgroundColor: "white",
          }}
          borderRadius="8px"
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "repeat(3, 1fr)",
              height: "100%",
              padding: "30px",
              boxShadow: "none",
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
            }}
          >
            <Item>
              <Typography
                sx={{
                  fontSize: "8rem",
                  fontWeight: "800",
                  textAlign: "center",
                }}
              >
                404
              </Typography>
            </Item>
            <Item>
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Not Found
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "400",
                  textAlign: "center",
                }}
              >
                The resource requested could not be found on this server!
              </Typography>
            </Item>
            <Item>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </Button>
            </Item>
          </Box>
        </Box>
      </Container>
    </>
  );
}
