import "./App.css";
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/NavBar";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import { UserProvider } from "./components/context/UserContext";
import { DateProvider } from "./components/context/DateContext";
import { Routes, Route } from "react-router";
import CallLog from "./pages/CallLog";


function App() {

  return (
    <>
      <DateProvider>
      <UserProvider>
          <NavBar />
            <Routes>
              <Route path="/" element={<Dashboard />}/>
              <Route path="/profile/" element={<Profile />}/>
              <Route path="/call-log" element={<CallLog />}/>
            </Routes>
          <Footer />
        </UserProvider>
        </DateProvider>
    </>
  );
}

export default App;
