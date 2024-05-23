import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

function Header() {
  const classes = useStyles();
  const { currency, setCurrency } = CryptoState();
  const navigate = useNavigate();

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <Container>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Typography
            onClick={() => navigate(`/`)}
            variant="h6"
            className={classes.title}
          >
            Crypto Hunter
          </Typography>
          <Select
            variant="outlined"
            value={currency}
            onChange={handleCurrencyChange}
            style={{ width: 100, height: 40, marginLeft: 15, color: "gold", backgroundColor: "#fff" }}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default Header;
