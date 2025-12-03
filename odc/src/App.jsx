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
import AddPrescription from "./doctorpages/AddPrescription.jsx";
import DoctorLogin from "./pages/DoctorLogin.jsx";
import MediConnectLanding from "./ladingpages/ladpage.jsx";
import PatientVideoPage from "./pages/PatientVideoPage.jsx";
import DoctorVideoPage from "./pages/DoctorVideoPage.jsx";
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
<Route
  path="/patientvideopage"
  element={
    <ProtectedRoute role="patient">
      <PatientVideoPage />
    </ProtectedRoute>
  }
/>
{/* PUBLIC ROUTES */}
<Route path="/patient" element={<PatientLanding />} />
<Route path="/login" element={<Login />} />
<Route path="/land" element={< LandingPage/>} />
<Route path="/doctorlogin" element={<DoctorLogin />} />

<Route path="/register" element={<Register />} />
<Route path="/unauthorized" element={<Unauthorized />} />
{/* <ProtectedRoute role="doctor"></ProtectedRoute> */}
<Route path="/" element={<MediConnectLanding />} />

{/* 🔐 DOCTOR DASHBOARD ROUTES (ROLE = doctor) */}
<Route
  path="/doctordashboard"
  element={
    <ProtectedRoute role="doctor">
      <DoctorDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/doctorvideopage"
  element={
    <ProtectedRoute role="doctor">
      <DoctorVideoPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/doctordashboard/profile"
  element={
    <ProtectedRoute role="doctor">
      <DoctorProfile />
    </ProtectedRoute>
  }
/>

<Route
  path="/doctordashboard/appointments"
  element={
    <ProtectedRoute role="doctor">
      <AppointmentsPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/doctordashboard/calendar"
  element={
    <ProtectedRoute role="doctor">
      <CalendarPage />
    </ProtectedRoute>
  }
/>

{/* Add Prescription (doctor only) */}
<Route
  path="/add-prescription/:appointmentId"
  element={
    <ProtectedRoute role="doctor">
      <AddPrescription />
    </ProtectedRoute>
  }
/>

{/* Unauthorized page */}
<Route path="/unauthorized" element={<Unauthorized />} />

        </Routes>
        </AuthProvider>
      </BrowserRouter>
      </PatientProvider>
      </DoctorProvider> 
    </AppProvider>
  );
};

export default App;
