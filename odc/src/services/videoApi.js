// src/services/videoApi.js
import axios from "axios";

const VIDEO_BASE = import.meta.env.VITE_VIDEO_API_BASE;

export const videoApi = {
  getByAppointment: (appointmentId) =>
    axios.get(`${VIDEO_BASE}/api/Video/by-appointment/${appointmentId}`),

  getSession: (sessionId) =>
    axios.get(`${VIDEO_BASE}/api/Video/${sessionId}`),

  markStarted: (sessionId) =>
    axios.post(`${VIDEO_BASE}/api/Video/${sessionId}/mark-started`),

  markEnded: (sessionId) =>
    axios.post(`${VIDEO_BASE}/api/Video/${sessionId}/mark-ended`),

  uploadRecording: (sessionId, file) => {
    const form = new FormData();
    form.append("file", file);
    return axios.post(`${VIDEO_BASE}/api/Video/${sessionId}/upload-recording`, form);
  },

  uploadPrescription: (sessionId, file) => {
    const form = new FormData();
    form.append("file", file);
    return axios.post(`${VIDEO_BASE}/api/Video/${sessionId}/upload-prescription`, form);
  }
};
