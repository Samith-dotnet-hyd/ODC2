import React, { useState, useRef } from "react";
import { videoApi } from "../services/videoApi";
import { Button } from "@mui/material";

export default function RecordingButton({ sessionId }) {
  const [isRecording, setIsRecording] = useState(false);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      const mr = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp8,opus" });
      mr.ondataavailable = (e) => { if (e.data && e.data.size) chunksRef.current.push(e.data); };
      mr.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const file = new File([blob], `rec-${Date.now()}.webm`);
        chunksRef.current = [];
        try {
          await videoApi.uploadRecording(sessionId, file);
          alert("Recording uploaded");
        } catch (e) { console.error("Upload error", e); alert("Upload failed"); }
      };
      mr.start();
      recorderRef.current = mr;
      setIsRecording(true);
    } catch (e) {
      console.error("start record error", e);
      alert("Unable to start recording: " + e.message);
    }
  };

  const stop = () => {
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
      recorderRef.current.stream.getTracks().forEach(t => t.stop());
    }
    setIsRecording(false);
  };

  return (
   <Button 
      variant="contained" 
      color={isRecording ? "error" : "primary"}
      onClick={isRecording ? stop : start}
      sx={{ borderRadius: "10px", textTransform: "none" }}
    >
      {isRecording ? "Stop & Upload" : "Start Recording"}
    </Button>
  );
}
