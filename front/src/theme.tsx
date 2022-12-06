import { createTheme, styled } from "@mui/material/styles";

import "@fontsource/lato";

const darkGray = "#0d0d0d";
const paragraph = "#2a2a2a";
const primaryColor = "#ff8e3c";
const secondaryColor = "#d9376e";
const background = "#eff0f3";

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    text: {
      primary: paragraph,
      secondary: darkGray,
    },
    background: {
      default: background,
    },
  },
  typography: {
    fontFamily: "Lato",
    h1: {
      color: darkGray,
      fontSize: "3rem",
      fontWeight: "700",
      fontFamily: "Lato",
      textAlign: "center",
    },
    h2: {
      color: darkGray,
      fontSize: "2rem",
      fontWeight: "500",
    },
    body1: {
      color: "text.primary",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#fff",
          fontWeight: "700",
          fontSize: "1.2rem",
        },
      },
    },
  },
});

export const MyButton = styled("button")({
  color: primaryColor,
});
