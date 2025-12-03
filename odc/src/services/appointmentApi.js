import axios from "axios";

const APPT_BASE = import.meta.env.VITE_APPT_API_BASE;

export const apptApi = {
  getAppointment: (appointmentId) =>
    axios.get(`${APPT_BASE}/api/Appointment/${appointmentId}`)
         .then(r => r.data),
};
