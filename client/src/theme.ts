import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";

export interface ITheme extends Theme {}

const palette = {
  primary: {
    main: "#031BA6",
  },
  background: {
    paper: "#ffffff",
    default: "#ffffff",
  },
  grey: {
    50: "#9E9E9E",
  },
};

const theme = createTheme({
  spacing: 5,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: palette,
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {},
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          height: 48,
          fontSize: 16,
          fontWeight: 400,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h2: {
          fontSize: 24,
          lineHeight: "36px",
          fontWeight: 500,
        },
        h3: {
          fontSize: 18,
          lineHeight: "27px",
          fontWeight: 700,
          letterSpacing: "0.15px",
          textTransform: "uppercase",
        },
        body1: {
          letterSpacing: "0.15px",
          fontSize: 16,
          lineHeight: "24px",
        },
      },
    },
  },
} as unknown as ThemeOptions);

export default theme;
