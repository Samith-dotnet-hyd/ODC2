import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateProfile from "./pages/Profile/CreateProfile";
import Profile from "./pages/Profile/Profile";
import DoctorListing from "./pages/DoctorListing";
import Navbar from "./components/Navbar";
import { AppProvider } from "./context/AppContext";
import { DoctorProvider } from "./context/DoctorContext";
import BookAppointment from "./doctorpages/BookAppointment";
import { PatientProvider } from "./context/PatientContext";
import PatientLanding from "./pages/PatientLanding";
<Routes>
  {/* other routes */}

  <Route path="/book/:doctorId" element={<BookAppointment />} />
</Routes>

import DoctorDashboard from "./doctorpages/DoctorDashboard";
import AppointmentsPage from "./doctorpages/AppointmentsPage";
import LandingPage from "./doctorpages/LandingPage";
import DoctorProfile from "./doctorpages/DoctorProfile";
import CalendarPage from "./doctorpages/CalendarPage";

const App = () => {
  return (
    <AppProvider>
      <DoctorProvider>
        <PatientProvider>
      <BrowserRouter>
        
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/doctors" element={<DoctorListing />} />
          <Route path="/profile" element={<Profile  />} />
            <Route path="/book/:doctorId" element={<BookAppointment />} />
<Route path="/patient" element={<PatientLanding />} />

<Route path="/profile/create" element={<CreateProfile />} />
<Route path="/" element={<LandingPage />} />
          <Route path="/doctordashboard" element={<DoctorDashboard />} />
          <Route path="/doctordashboard/profile" element={<DoctorProfile />} />
          <Route path="/doctordashboard/appointments" element={<AppointmentsPage />} />
          <Route path="/doctordashboard/calendar" element={<CalendarPage />} />
        </Routes>
      </BrowserRouter>
      </PatientProvider>
      </DoctorProvider> 
    </AppProvider>
  );
};

export default App;
