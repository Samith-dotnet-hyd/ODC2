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
import Prescriptions from "./pages/Prescriptions";
import ConfirmBooking from "./pages/ConfirmBooking";
import Login from "./pages/Ploginpage";
import Register from "./pages/Pregisterpage";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized.jsx";

const App = () => {
  return (
    <AppProvider>
      <DoctorProvider>
        <PatientProvider>
      <BrowserRouter>
       <AuthProvider>
        
        <Routes>
          {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/doctors" element={<DoctorListing />} />
          <Route path="/dashboard/profile" element={<Profile  />} />
            <Route path="/dashboard/book/:doctorId" element={<BookAppointment />} />
<Route path="/patient" element={<PatientLanding />} />
<Route path="/dashboard/history" element={<HistoryPage />} />
<Route
  path="/dashboard/appointment/:appointmentId"
  element={<AppointmentDetails />}
/>
 <Route path="/login" element={<Login  />} />
        <Route path="/register" element={<Register />} />
<Route path="/dashboard/prescriptions" element={<Prescriptions />} />
< Route path= "/dashboard/book/:doctorId/confirm" element={ <ConfirmBooking /> }/>
<Route path="/unauthorized" element={<Unauthorized />} />

<Route path="/dashboard/profile/create" element={<CreateProfile />} /> */}

<Route
  path="/dashboard"
  element={
    <ProtectedRoute role="patient">
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard/doctors"
  element={
    <ProtectedRoute role="patient">
      <DoctorListing />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard/profile"
  element={
    <ProtectedRoute role="patient">
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard/book/:doctorId"
  element={
    <ProtectedRoute role="patient">
      <BookAppointment />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard/book/:doctorId/confirm"
  element={
    <ProtectedRoute role="patient">
      <ConfirmBooking />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard/history"
  element={
    <ProtectedRoute role="patient">
      <HistoryPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard/appointment/:appointmentId"
  element={
    <ProtectedRoute role="patient">
      <AppointmentDetails />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard/prescriptions"
  element={
    <ProtectedRoute role="patient">
      <Prescriptions />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard/profile/create"
  element={
    <ProtectedRoute role="patient">
      <CreateProfile />
    </ProtectedRoute>
  }
/>

{/* PUBLIC ROUTES */}
<Route path="/patient" element={<PatientLanding />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/unauthorized" element={<Unauthorized />} />

<Route path="/" element={<LandingPage />} />
          <Route path="/doctordashboard" element={<ProtectedRoute role="doctor">
      <DoctorDashboard />
    </ProtectedRoute>} />
          <Route path="/doctordashboard/profile" element={<DoctorProfile />} />
          <Route path="/doctordashboard/appointments" element={<AppointmentsPage />} />
          <Route path="/doctordashboard/calendar" element={<CalendarPage />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
      </PatientProvider>
      </DoctorProvider> 
    </AppProvider>
  );
};

export default App;
