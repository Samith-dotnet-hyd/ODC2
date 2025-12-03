// src/services/notificationApi.js
import axios from "axios";
const NOTIFY_BASE = import.meta.env.VITE_NOTIFICATION_BASE; // e.g. https://localhost:7096
const client = axios.create({ baseURL: NOTIFY_BASE, timeout: 15000 });

export const notificationApi = {
  sendEmail: (payload) => client.post("/api/Notification/send-email", payload)
};
