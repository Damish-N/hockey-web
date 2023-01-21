import './App.css';
import NavBar from "./shared/components/Navbar/NavBar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import {createTheme, ThemeProvider} from '@mui/material/styles';

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


function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                {/*<NavBar/>*/}
                {/*<Home/>*/}
                <Login/>
            </div>
        </ThemeProvider>

    );
}

export default App;
