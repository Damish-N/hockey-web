import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./pages/Login/Login";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NavBar from "./shared/components/Navbar/NavBar";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Grid } from "@material-ui/core";
import Players from "./pages/Dashboard/Players/Players";
import Matches from "./pages/Dashboard/Matches/Matches";
import CashMangement from "./pages/Dashboard/CashMangement/CashMangement";
import News from "./pages/News/News";

const theme = createTheme({
  palette: {
    primary: {
      main: "#750077",
    },
    secondary: {
      main: "#ff9800",
    },
    success: {
      main: "#4caf50",
    },
  },
});

function LayoutsWithNavbar() {
  return (
    <>
      {/* Your navbar component */}
      <NavBar />

      {/* This Outlet is the place in which react-router will render your components that you need with the navbar */}
      <Outlet />

      {/* You can add a footer to get fancy in here :) */}
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Grid className="App">
        <Routes>
          <Route path="/" exact element={<LayoutsWithNavbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/players" element={<Players />} />
            <Route path="/dashboard/matches" element={<Matches />} />
            <Route path="/dashboard/cash" element={<CashMangement />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
