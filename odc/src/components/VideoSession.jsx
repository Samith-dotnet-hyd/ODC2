// src/components/VideoSession.jsx
import React, { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { useNavigate } from "react-router-dom";
import { videoApi } from "../services/videoApi";
import { doctorApi } from "../services/doctorApi";
import { patientApi } from "../services/patientApi";
import { notificationApi } from "../services/notificationApi";
import "./VideoSession.css"
import ChatBox from "./ChatBox";
import RecordingButton from "./RecordingButton";
import PrescriptionUpload from "./PrescriptionUpload";
import PrescriptionForm from "./PrescriptionForm";
import api from "../api";
// import "../styles/video.css";

export default function VideoSession({
  sessionId,
  roomName,
  userId,
  displayName,

  appointmentId,
  doctorId,
  patientId,
  doctorName,
  patientName,

  scheduledStart,
  sessionStatus
}) {
  // -------------------------------
  // STATE
  // -------------------------------
  const jitsiContainer = useRef(null);
  const apiRef = useRef(null);
const navigate = useNavigate();
  const [loadingJitsi, setLoadingJitsi] = useState(true);
  const [joined, setJoined] = useState(false);
  const [hub, setHub] = useState(null);
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState(sessionStatus || "Scheduled");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [patientEmail, setPatientEmail] = useState("");

  const [showPresc, setShowPresc] = useState(false);

  // -------------------------------
  // FETCH DOCTOR + PATIENT EMAILS
  // -------------------------------
  useEffect(() => {
    async function loadInfo() {
      try {
        if (doctorId) {
          const d = await doctorApi.getDoctorById(doctorId);
          setDoctorEmail(d.data?.email);
        }
        if (patientId) {
          const p = await patientApi.getPatientById(patientId);
          setPatientEmail(p.data?.email);
        }
      } catch (err) {
        console.warn("Email load error:", err);
      }
    }
    loadInfo();
  }, [doctorId, patientId]);

  // -------------------------------
  // INIT JITSI
  // -------------------------------
  useEffect(() => {
    const check = setInterval(() => {
      if (window.JitsiMeetExternalAPI && jitsiContainer.current) {
        clearInterval(check);

        const api = new window.JitsiMeetExternalAPI(
          new URL(import.meta.env.VITE_JITSI_BASE || "https://meet.jit.si")
            .hostname,
          {
            roomName,
            parentNode: jitsiContainer.current,
            width: "100%",
            height: "100%",
            userInfo: { displayName }
          }
        );

        apiRef.current = api;

        api.addEventListener("readyToClose", async () => {
          await videoApi.markEnded(sessionId);
          setStatus("Ended");
        });

        setLoadingJitsi(false);
      }
    }, 200);

    return () => clearInterval(check);
  }, [roomName, displayName]);

  // -------------------------------
  // SIGNALR CHAT
  // -------------------------------
  useEffect(() => {
    if (!sessionId) return;

    const hubUrl = `${import.meta.env.VITE_VIDEO_API_BASE}/hubs/video?sessionId=${sessionId}&userId=${userId}`;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => console.log("SignalR connected"))
      .catch((err) => console.error("SignalR error:", err));

    connection.on("ReceiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    setHub(connection);

    return () => connection.stop();
  }, [sessionId, userId]);

  // -------------------------------
  // AUTO JOIN (Optional)
  // -------------------------------
  useEffect(() => {
    if (!scheduledStart) return;

    const startTime = new Date(scheduledStart).getTime();

    const timer = setInterval(() => {
      if (Date.now() >= startTime && !joined) {
        joinCall();
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [scheduledStart, joined]);

  // -------------------------------
  // JOIN CALL (EMAIL INCLUDED HERE)
  // -------------------------------
  const joinCall = async () => {
    if (!apiRef.current || joined) return;

    apiRef.current.executeCommand("displayName", displayName);
    setJoined(true);

    try {
      // Doctor joins → notify patient
      if (userId === doctorId) {
        await notificationApi.sendEmail({
          toEmail: patientEmail,
          subject: "Doctor has joined the meeting",
          message: `Dr. ${doctorName} has joined.\nJoin meeting: ${import.meta.env.VITE_JITSI_BASE}/${roomName}`
        });
      }

      // Patient joins → notify doctor
      if (userId === patientId) {
        await notificationApi.sendEmail({
          toEmail: doctorEmail,
          subject: "Patient has joined the meeting",
          message: `${patientName} has joined.\nJoin meeting: ${import.meta.env.VITE_JITSI_BASE}/${roomName}`
        });
      }
    } catch (err) {
      console.error("Join email error:", err);
    }

    try {
      await videoApi.markStarted(sessionId);
      setStatus("Started");
    } catch (err) {
      console.error("markStarted failed:", err);
    }
  };

  // -------------------------------
  // END CALL
  // -------------------------------
  const endCall = async () => {
    if (apiRef.current) apiRef.current.executeCommand("hangup");

    try {
      await videoApi.markEnded(sessionId);
    } catch (err) {}

    setStatus("Ended");
    handleMarkCompleted();
    navigate("/dashboard");
  };
const handleMarkCompleted = async () => {
  const confirmDone = window.confirm("Mark this appointment as Completed?");
  if (!confirmDone) return;

  try {
    // 1️⃣ Fetch the appointment first
    const apptRes = await api.get(`/appointments/${appointmentId}`);
    const currentAppointment = apptRes.data;

    if (!currentAppointment) {
      alert("Appointment not found.");
      return;
    }

    // 2️⃣ Update to Completed
    await api.put(`/appointments/update/${appointmentId}`, {
      status: "Completed",
      notes: currentAppointment.notes || "Marked as completed"
    });

    alert("Appointment marked as Completed!");

    // 3️⃣ Refresh dashboard
    navigate("/dashboard");

  } catch (err) {
    console.error("Complete update error:", err);
    alert("Failed to mark as completed");
  }
};

  // -------------------------------
  // SEND CHAT
  // -------------------------------
  const sendMessage = async (text) => {
    if (!hub) return;

    await hub.invoke("SendMessage", sessionId, userId, displayName, text);
  };

  // -------------------------------
  // NEW: remind other person
  // -------------------------------
  const sendReminder = async () => {
    // determine who to remind
    console.log(userId +": dI :"+doctorId +" PI: "+patientId +" de"+doctorEmail+" pe"+patientEmail);
    const meetingLink = `${import.meta.env.VITE_JITSI_BASE}/${roomName}`;
    try {

      if (userId === doctorId) {
        // doctor is current user -> remind patient
        if (!patientEmail) {
          alert("Patient email not available.");
          return;
        }

       await notificationApi.sendEmail({
  toEmail: patientEmail,
  toPhone: "",
  subject: "Reminder: Video consultation is starting now",
  message: `
Dear ${patientName || "Patient"},

This is a reminder that your video consultation with Dr. ${doctorName} is starting now.

Please join the meeting using the link below:
${meetingLink}

If you have any trouble joining, please reply to this email.

Regards,
Vital Connect Team
`
});

        alert("Reminder sent to patient.");
      } else if (userId === patientId) {
        // patient is current user -> remind doctor
        if (!doctorEmail) {
          alert("Doctor email not available.");
          return;
        }

   await notificationApi.sendEmail({
  toEmail: doctorEmail,
  toPhone: "",
  subject: "Reminder: Your video consultation is starting now",
  message: `
Dear Dr. ${doctorName || "Doctor"},

This is a reminder that your scheduled video consultation with patient ${patientName} is starting now.

Please join the meeting using the link below:
${meetingLink}

If you have any trouble joining, please reply to this email.

Regards,
Telehealth Team
`
});
        alert("Reminder sent to doctor.");
      } else {
        // fallback: send to patient by default
        if (patientEmail) {
          await notificationApi.sendEmail({
            toEmail: patientEmail,
            toPhone: "",
            subject: "Reminder: Video consultation",
            message: `Join meeting: ${meetingLink}`
          });
          alert("Reminder sent.");
        } else {
          alert("No recipient available to remind.");
        }
      }
    } catch (err) {
      console.error("Reminder send failed:", err);
      alert("Failed to send reminder. See console for details.");
    }
  };

  // -------------------------------
  // UI RENDER
  // -------------------------------
  return (
    
  <div className="vs-wrapper">

    {/* LEFT SIDE — VIDEO AREA */}
    <div className="vs-video-section">

      {loadingJitsi && <div className="vs-loading">Loading Video…</div>}

      <div ref={jitsiContainer} className="vs-jitsi-box" />

      {/* CONTROLS BAR */}
      <div className="vs-controls">

        {!joined ? (
          <button className="vs-btn vs-primary" onClick={joinCall}>
            Join Call
          </button>
        ) : (
          <button className="vs-btn vs-danger" onClick={endCall}>
            End Call
          </button>
        )}

        <RecordingButton sessionId={sessionId} />

        <button className="vs-btn vs-secondary" onClick={() => setShowPresc(true)}>
          Write Prescription
        </button>

        {/* Reminders */}
        {userId === doctorId && (
          <button className="vs-btn vs-warning" onClick={sendReminder}>
            Remind Patient
          </button>
        )}

        {userId === patientId && (
          <button className="vs-btn vs-warning" onClick={sendReminder}>
            Remind Doctor
          </button>
        )}
      </div>
    </div>

    {/* RIGHT SIDE PANEL */}
    <div className="vs-side-panel">
      <ChatBox messages={messages} onSend={sendMessage} />
      <PrescriptionUpload sessionId={sessionId} />

      <div className="vs-status-box">
        <strong>Status:</strong> {status}
      </div>
    </div>

    {/* PRESCRIPTION POPUP */}
    {showPresc && (
      <PrescriptionForm
        appointmentId={appointmentId}
        doctorId={doctorId}
        patientId={patientId}
        patientEmail={patientEmail}
        onClose={() => setShowPresc(false)}
      />
    )}
  </div>
);

  
}














// // // src/components/VideoSession.jsx
// // import React, { useEffect, useRef, useState } from "react";
// // import * as signalR from "@microsoft/signalr";

// // import { videoApi } from "../services/videoApi";
// // import { doctorApi } from "../services/doctorApi";
// // import { patientApi } from "../services/patientApi";
// // import { notificationApi } from "../services/notificationApi";

// // import ChatBox from "./ChatBox";
// // import RecordingButton from "./RecordingButton";
// // import PrescriptionUpload from "./PrescriptionUpload";
// // import PrescriptionForm from "./PrescriptionForm";

// // import "../styles/video.css";

// // export default function VideoSession({
// //   sessionId,
// //   roomName,
// //   userId,
// //   displayName,

// //   appointmentId,
// //   doctorId,
// //   patientId,
// //   doctorName,
// //   patientName,

// //   scheduledStart,
// //   sessionStatus
// // }) {
// //   // -------------------------------
// //   // STATE
// //   // -------------------------------
// //   const jitsiContainer = useRef(null);
// //   const apiRef = useRef(null);

// //   const [loadingJitsi, setLoadingJitsi] = useState(true);
// //   const [joined, setJoined] = useState(false);
// //   const [hub, setHub] = useState(null);
// //   const [messages, setMessages] = useState([]);
// //   const [status, setStatus] = useState(sessionStatus || "Scheduled");

// //   const [doctorEmail, setDoctorEmail] = useState("");
// //   const [patientEmail, setPatientEmail] = useState("");

// //   const [showPresc, setShowPresc] = useState(false);

// //   // -------------------------------
// //   // FETCH DOCTOR + PATIENT EMAILS
// //   // -------------------------------
// //   useEffect(() => {
// //     async function loadInfo() {
// //       if (doctorId) {
// //         const res = await doctorApi.getDoctorById(doctorId);
// //         setDoctorEmail(res.data?.email);
// //       }
// //       if (patientId) {
// //         const res = await patientApi.getPatientById(patientId);
// //         setPatientEmail(res.data?.email);
// //       }
// //     }
// //     loadInfo();
// //   }, [doctorId, patientId]);

// //   // -------------------------------
// //   // INIT JITSI
// //   // -------------------------------
// //           console.log("pE"+patientEmail +" : dE :"+doctorEmail)

// //   useEffect(() => {
// //     let timer = setInterval(() => {
// //       if (window.JitsiMeetExternalAPI && jitsiContainer.current) {
// //         clearInterval(timer);

// //         const api = new window.JitsiMeetExternalAPI(
// //           new URL(import.meta.env.VITE_JITSI_BASE || "https://meet.jit.si")
// //             .hostname,
// //           {
// //             roomName,
// //             parentNode: jitsiContainer.current,
// //             width: "100%",
// //             height: "100%",
// //             userInfo: { displayName }
// //           }
// //         );

// //         apiRef.current = api;

// //         // notify when meeting ends
// //         api.addEventListener("readyToClose", async () => {
// //           await videoApi.markEnded(sessionId);
// //           setStatus("Ended");
// //         });

// //         // notify on user joined
// //         api.addEventListener("participantJoined", async (event) => {
// //     try {
// //         const name = event.displayName?.toLowerCase() || "";

// //         console.log("Participant joined:", name);

// //         // Ensure emails have loaded
// //         if (!doctorEmail || !patientEmail) {
// //             console.warn("Emails not loaded yet");
// //             return;
// //         }

// //         // Doctor Joined → notify patient
// //         if (doctorName || name.includes(doctorName.toLowerCase())) {
// //             await notificationApi.sendEmail({
// //                 toEmail : patientEmail,
// //                 // toEmail: "kanugantisuraj3@gmail.com",
// //                 toPhone: "",
// //                 subject: "Doctor has joined your meeting",
// //                 message: `Dr. ${doctorName} has joined the meeting.\nJoin Now: ${import.meta.env.VITE_JITSI_BASE}/${roomName}`
// //             });
// //             console.log("Email sent to patient:", patientEmail);
// //         }

// //         // Patient Joined → notify doctor
// //         if (patientName || name.includes(patientName.toLowerCase())) {
// //             await notificationApi.sendEmail({
// //                 toEmail: doctorEmail,
// //                 // toEmail:  "kanugantisuraj3@gmail.com",
// //                 toPhone: "",
// //                 subject: "Patient is waiting in the meeting",
// //                 message: `${patientName} has joined the meeting.\nJoin Now: ${import.meta.env.VITE_JITSI_BASE}/${roomName}`
// //             });
// //             console.log("Email sent to doctor:", doctorEmail);
// //         }

// //     } catch (err) {
// //         console.error("Failed to send join email:", err);
// //     }
// // });
// //         // api.addEventListener("participantJoined", async (ev) => {
// //         //   const name = ev.displayName || "";

// //         //   try {
// //         //     // doctor joined → notify patient
// //         //     if (name.toLowerCase() === doctorName?.toLowerCase()) {
// //         //       await notificationApi.sendEmail({
// //         //         toEmail: patientEmail,
// //         //         subject: "Doctor joined your appointment",
// //         //         message: `Dr. ${doctorName} joined.\nJoin link: ${import.meta.env.VITE_JITSI_BASE}/${roomName}`
// //         //       });
// //         //     }

// //         //     // patient joined → notify doctor
// //         //     if (name.toLowerCase() === patientName?.toLowerCase()) {
// //         //       await notificationApi.sendEmail({
// //         //         toEmail: doctorEmail,
// //         //         subject: "Patient joined your appointment",
// //         //         message: `${patientName} is waiting.\nJoin link: ${import.meta.env.VITE_JITSI_BASE}/${roomName}`
// //         //       });
// //         //     }
// //         //   } catch (err) {
// //         //     console.warn("Notification failed", err);
// //         //   }
// //         // });

// //         setLoadingJitsi(false);
// //       }
// //     }, 300);

// //     return () => clearInterval(timer);
// //   }, [roomName, displayName, patientEmail, doctorEmail]);

// //   // -------------------------------
// //   // SIGNALR CHAT
// //   // -------------------------------
// //   useEffect(() => {
// //     if (!sessionId) return;

// //     const hubUrl = `${import.meta.env.VITE_VIDEO_API_BASE}/hubs/video?sessionId=${sessionId}&userId=${userId}`;

// //     const connection = new signalR.HubConnectionBuilder()
// //       .withUrl(hubUrl)
// //       .withAutomaticReconnect()
// //       .build();

// //     connection
// //       .start()
// //       .then(() => console.log("SignalR connected"))
// //       .catch((err) => console.error("SignalR error:", err));

// //     connection.on("ReceiveMessage", (msg) => {
// //       setMessages((prev) => [...prev, msg]);
// //     });

// //     setHub(connection);

// //     return () => connection.stop();
// //   }, [sessionId, userId]);

// //   // -------------------------------
// //   // AUTO-JOIN BASED ON TIME
// //   // -------------------------------
// //   useEffect(() => {
// //     if (!scheduledStart) return;

// //     const scheduled = new Date(scheduledStart).getTime();
// //     const check = () => {
// //       if (Date.now() >= scheduled || status === "Started") joinCall();
// //     };

// //     const interval = setInterval(check, 2000);
// //     check();

// //     return () => clearInterval(interval);
// //   }, [scheduledStart, status]);

// //   // -------------------------------
// //   // JOIN CALL
// //   // -------------------------------
// //   const joinCall = async () => {
// //     if (!apiRef.current || joined) return;

// //     apiRef.current.executeCommand("displayName", displayName);
// //     setJoined(true);

// //     // await videoApi.markStarted(sessionId);
// //     console.log(sessionId);
// //     // alert(sessionId);
// //     setStatus("Started");
// //   };

// //   // -------------------------------
// //   // END CALL
// //   // -------------------------------
// //   const endCall = async () => {
// //     if (apiRef.current) apiRef.current.executeCommand("hangup");
// //     await videoApi.markEnded(sessionId);
// //     setStatus("Ended");
// //   };

// //   // -------------------------------
// //   // SEND CHAT MESSAGE
// //   // -------------------------------
// //   const sendMessage = async (text) => {
// //     if (!hub) return;
// //     await hub.invoke("SendMessage", sessionId, userId, displayName, text);
// //   };

// //   // -------------------------------
// //   // UI
// //   // -------------------------------
// //   return (
// //     <div className="video-wrapper">
// //       <div className="video-container">
// //         {loadingJitsi && <div className="loading-text">Loading Video…</div>}

// //         <div ref={jitsiContainer} className="jitsi-area" />

// //         <div className="video-buttons">
// //           {!joined ? (
// //             <button className="control-btn" onClick={joinCall}>
// //               Join Call
// //             </button>
// //           ) : (
// //             <button className="control-btn" onClick={endCall}>
// //               End Call
// //             </button>
// //           )}

// //           <RecordingButton sessionId={sessionId} />
// //           <button className="control-btn" onClick={() => setShowPresc(true)}>
// //             Write Prescription
// //           </button>
// //         </div>
// //       </div>

// //       <div className="side-panel">
// //         <ChatBox messages={messages} onSend={sendMessage} />
// //         <PrescriptionUpload sessionId={sessionId} />

// //         <div style={{ marginTop: 12 }}>
// //           <strong>Status:</strong> {status}
// //         </div>
// //       </div>

// //       {showPresc && (
// //         <PrescriptionForm
// //           appointmentId={appointmentId}
// //           doctorId={doctorId}
// //           patientId={patientId}
// //           patientEmail={patientEmail}
// //           onClose={() => setShowPresc(false)}
// //         />
// //       )}
// //     </div>
// //   );
// // }
