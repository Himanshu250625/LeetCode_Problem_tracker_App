import React, { useState } from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Box,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import QuestionList from "./components/QuestionList";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#121212" : "#ffffff",
      },
      primary: {
        main: darkMode ? "#ff9800" : "#ff9800", // Orange color
      },
      secondary: {
        main: darkMode ? "#f48fb1" : "#d32f2f",
      },
    },
  });

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            DSA Questions
          </Typography>
          <IconButton color="inherit" onClick={handleDarkModeToggle}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 4 }}>
        <QuestionList darkMode={darkMode} />
      </Container>
      <Box
        component="footer"
        sx={{
          textAlign: "center",
          padding: 4,
          marginTop: 8,
          
          backgroundColor: darkMode ? "#333" : "#f1f1f1",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Himanshu Singh
        </Typography>
        <Typography variant="body2">
          <a
            href="https://github.com/himanshusingh9793"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            GitHub
          </a>{" "}
          |
          <a
            href="https://www.linkedin.com/in/himanshu-singh-105094230/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "inherit",
              marginLeft: "8px",
            }}
          >
            LinkedIn
          </a>
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default App;
