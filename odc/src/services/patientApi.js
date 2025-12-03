
// src/services/patientApi.js
import axios from "axios";
const PATIENT_BASE = import.meta.env.VITE_PATIENT_BASE || "http://localhost:5138";
const clientP = axios.create({ baseURL: PATIENT_BASE, timeout: 10000 });
export const patientApi = { getPatientById: (id) => clientP.get(`/api/Patients/${id}`) };
