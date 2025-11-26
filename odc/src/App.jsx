import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateProfile from "./pages/Profile/CreateProfile";
import Profile from "./pages/Profile/Profile";
import DoctorListing from "./pages/DoctorListing";
import Navbar from "./components/Navbar";
import { AppProvider } from "./context/AppContext";

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/doctors" element={<DoctorListing />} />
          <Route path="/profile" element={<Profile  />} />
<Route path="/profile/create" element={<CreateProfile />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
