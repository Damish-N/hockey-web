import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./pages/Login/Login";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NavBar from "./shared/components/Navbar/NavBar";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreatePlayers from "./pages/Dashboard/Players/CreatePlayers";
import Matches from "./pages/Dashboard/Matches/Matches";
import CashMangement from "./pages/Dashboard/CashMangement/CashMangement";
import { useState } from "react";
import Context from "./shared/context/Context";

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

function LayoutsWithNavbar(props) {
  // const [logon, setLogon] = useState(props.state);

  function changeStateOnApp() {
    console.log("changeStateOnApp-1");
    props.changeState();
  }

  return (
    <>
      {/* Your navbar component */}
      <NavBar changeState={changeStateOnApp} />

      {/* This Outlet is the place in which react-router will render your components that you need with the navbar */}
      <Outlet />

      {/* You can add a footer to get fancy in here :) */}
    </>
  );
}

const PrivateRoute = ({ component: Component }) => {
  return sessionStorage["user"] ? <Component /> : <Navigate to="/login" />;
};

function App() {
  const [logon, setLogon] = useState(false);

  function changeStateOnApp() {
    console.log("changeStateOnApp");
    setLogon(!logon);
  }

  // const value = useContext(Context);
  return (
    <ThemeProvider theme={theme}>
      <Context.Provider value={{ login: logon }}>
        <Routes>
          <Route
            path="/"
            element={
              <LayoutsWithNavbar changeState={changeStateOnApp} state={logon} />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute component={Dashboard} />}
            />
            <Route path="/dashboard/players" element={<CreatePlayers />} />
            <Route path="/dashboard/matches" element={<Matches />} />
            <Route path="/dashboard/cash" element={<CashMangement />} />
          </Route>
          <Route
            path="/login"
            element={<Login changeState={changeStateOnApp} />}
          />
        </Routes>
      </Context.Provider>
      {/*<Grid className="App">*/}
      {/*  <Routes>*/}
      {/*    <Route path="/" exact element={<LayoutsWithNavbar />}>*/}
      {/*      <Route path="/" element={<Home />} />*/}
      {/*      <Route path="/home" element={<Home />} />*/}
      {/*      <Route path="/dashboard" element={<Dashboard />} />*/}
      {/*      <Route path="/dashboard/players" element={<CreatePlayers />} />*/}
      {/*      <Route path="/dashboard/matches" element={<Matches />} />*/}
      {/*      <Route path="/dashboard/cash" element={<CashMangement />} />*/}
      {/*    </Route>*/}
      {/*    <Route path="/login" element={<Login />} />*/}
      {/*  </Routes>*/}
      {/*</Grid>*/}
    </ThemeProvider>
  );
}

export default App;
