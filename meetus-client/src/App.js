import React, { useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./components/home/Home";
import GlobalStyles from "./components/GlobalStyles";
import { ThemeProvider } from "styled-components";
import ThemeContext from "./components/header/ThemeContext";
import Event from "./components/event/Event";
import AboutUs from "./components/about/AboutUs";
import EventDetails from "./components/event/EventDetails";
import UserDashboard from "./components/userDashboard/UserDashboard";

export const LoggedInContext = React.createContext();

function App() {
  const { theme } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({})
  const value = { login: [isLoggedIn, setIsLoggedIn], user: [user, setUser] }
  return (
    <ThemeProvider theme={{ theme }}>
      <GlobalStyles />
      <LoggedInContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />}></Route>
            <Route path="/event" element={<Event />}></Route>
            <Route path="/about" element={<AboutUs />}></Route>
            <Route path="/eventDetails" element={<EventDetails />}></Route>
          </Route>
          <Route path="/dashboard" element={<UserDashboard />}></Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </LoggedInContext.Provider>
    </ThemeProvider>
  );
}

export default App;
