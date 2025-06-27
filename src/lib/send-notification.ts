import axios from "axios";

interface NotificationPayload {
  title: string;
  body: string;
  url?: string;
  data?: Record<string, string>;
}


export const sendNotifications = async (payload: NotificationPayload) => {
  try {
    const response = await axios.post(`${process.env.PAREWA_BASE_URI}/api/send-notifications`, payload);
    console.log("Notification response:", response.data);
  } catch (error: any) {
    console.error("Failed to send notification:", error.response?.data || error.message);
  }
};
