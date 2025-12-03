// src/services/prescriptionApi.js
import axios from "axios";
const PRESC_BASE = import.meta.env.VITE_PRESCRIPTION_BASE; // e.g. https://localhost:7107
const client = axios.create({ baseURL: PRESC_BASE, timeout: 20000 });

export const prescriptionApi = {
  create: (payload) => client.post("/api/Prescription", payload)
};
