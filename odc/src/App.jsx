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
import HistoryPage from "./pages/HistoryPage";
import AppointmentDetails from "./pages/AppointmentDetails";
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
          <Route path="/dashboard/doctors" element={<DoctorListing />} />
          <Route path="/dashboard/profile" element={<Profile  />} />
            <Route path="/dashboard/book/:doctorId" element={<BookAppointment />} />
<Route path="/patient" element={<PatientLanding />} />
<Route path="/dashboard/history" element={<HistoryPage />} />
<Route
  path="/dashboard/appointment/:appointmentId"
  element={<AppointmentDetails />}
/>
<Route path="/dashboard/profile/create" element={<CreateProfile />} />
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
