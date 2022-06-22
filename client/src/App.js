import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import UserRegister from "./pages/UserRegister";
import Verify from "./pages/Verify";

const theme1 = createTheme({
  typography: {
    h1: {
      fontFamily: "AirbnbCerealMedium",
    },
    h2: {
      fontFamily: "AirbnbCerealMedium",
    },
    h3: {
      fontFamily: "AirbnbCerealMedium",
    },
    h4: {
      fontFamily: "AirbnbCerealMedium",
    },
    h5: {
      fontFamily: "AirbnbCerealMedium",
    },
    h6: {
      fontFamily: "AirbnbCerealBook",
    },
    body1: {
      fontFamily: "AirbnbCerealBook",
    },
    body2: {
      fontFamily: "AirbnbCerealBook",
    },
    p: {
      fontFamily: "AirbnbCerealBook",
    },
    overline: {
      fontFamily: "AirbnbCerealMedium",
    },
    button: { fontFamily: "AirbnbCerealBook" },
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    primary: {
      main: "#5b21b6",
    },
    secondary: {
      main: "#B2BEB5",
    },
  },
});

let theme = responsiveFontSizes(theme1);

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            {/* 
              <Route exact path="/" component={Landing} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/user-register" element={<UserRegister />} />

            {/* <AuthRoute path="/profile" component={Profile} /> */}
            {/* <Route component={NotFound} /> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
