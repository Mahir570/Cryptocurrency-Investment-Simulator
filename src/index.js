import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "react-alice-carousel/lib/alice-carousel.css";
import { ThemeProvider } from "@mui/material/styles";
import CryptoContext from "./CryptoContext";
import {createTheme} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <CryptoContext>
      <ThemeProvider theme={darkTheme}>
          <App />
      </ThemeProvider>
    </CryptoContext>
  </React.StrictMode>,
  document.getElementById("root")
);
