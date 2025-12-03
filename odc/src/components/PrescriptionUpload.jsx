import React from "react";
import { videoApi } from "../services/videoApi";
import { Button, Card, Typography } from "@mui/material";
import { notificationApi } from "../services/notificationApi";

export default function PrescriptionUpload({ sessionId }) {
  const onChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await videoApi.uploadPrescription(sessionId, file);
const url = res?.data?.fileUrl ?? res?.data?.pdfUrl ?? res?.data?.url;
alert("Prescription uploaded: " + (url || "OK"));
await notificationApi.sendEmail({
        toEmail: "samithreddykandala"+ "@gmail.com",  // ← replace with actual email
        toPhone:"9999999999",
        subject: "Your Prescription is Ready",
        message:  `
Dear Patient,
 
Your prescription has been uploaded successfully.
You can access it using the link below:
 
${url}
 
If you have any questions, feel free to reply to this email.
 
Regards,  
Vital Connect Team
        `
   
      });

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
   <Card sx={{ p:2, borderRadius:3, boxShadow:2 }}>
      <Typography fontSize={18} fontWeight={600} mb={1}>
        Files / Prescription
      </Typography>

      <input type="file" onChange={onChange} />

      <Button
        variant="contained"
        fullWidth
        sx={{ mt:2, borderRadius:2, textTransform:"none" }}
      >
        Upload
      </Button>
    </Card>
  );
}
