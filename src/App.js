import './App.css';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Login from "./pages/Login/Login";
import {Outlet, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import NavBar from "./shared/components/Navbar/NavBar";

const theme = createTheme({
    palette: {
        primary: {
            main: '#750077',
        },
        secondary: {
            main: '#ff9800',
        },
    }
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
            <div className="App">
                <Routes>
                    <Route path="/" exact element={<LayoutsWithNavbar/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/home" element={<Home/>}/>
                    </Route>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </div>

        </ThemeProvider>

    );
}

export default App;
