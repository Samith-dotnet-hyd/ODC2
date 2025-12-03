// src/services/doctorApi.js
import axios from "axios";

const DOCTOR_BASE = import.meta.env.VITE_DOCTOR_BASE || "http://localhost:5108";

export const doctorApi = {
  // GET doctor by ID
  getDoctorById: (id) => {
    return axios.get(`${DOCTOR_BASE}/api/doctors/${id}`);
  },
};
