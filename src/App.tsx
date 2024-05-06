import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../../Reserve/src/Login";
import Home from "./Home";
import Detail from "./Detail";
import Booking from "./Booking";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Kanit", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="detail" element={<Detail />} />
            <Route path="booking" element={<Booking />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}
export default App;
